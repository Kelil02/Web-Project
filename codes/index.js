const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('./auth');
const db = require('./db');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;
const saltRounds = 10;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: process.env.SESSION_SECRET || 'your-very-secret-key-change-me',
    resave: false,
    saveUninitialized: false,
    cookie: {}
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ error: 'Authentication required. Please log in.' });
}

function ensureAdmin(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ error: 'Authentication required. Please log in.' });
    }
    if (req.user && req.user.role === 'admin') {
        return next();
    }
    res.status(403).json({ error: 'Access denied. Admin privileges required.' });
}

const pageRouter = express.Router();
pageRouter.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views', 'main.html')));
pageRouter.get('/leave', (req, res) => res.sendFile(path.join(__dirname, 'views', 'leave.html')));
pageRouter.get('/schedule', (req, res) => res.sendFile(path.join(__dirname, 'views', 'schedule.html')));
pageRouter.get('/news', (req, res) => res.sendFile(path.join(__dirname, 'views', 'news.html')));
app.use('/', pageRouter);

const authRouter = express.Router();

authRouter.post('/register', async (req, res) => {
    const { username, password, role = 'employee' } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
    }
    if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
    }
    if (!['employee', 'admin'].includes(role)) {
        return res.status(400).json({ error: 'Invalid role specified.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const sql = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
        db.run(sql, [username, hashedPassword, role], function (err) {
            if (err) {
                if (err.code === 'SQLITE_CONSTRAINT' && err.message.includes('UNIQUE constraint failed: users.username')) {
                    return res.status(409).json({ error: 'Username already exists. Please choose another.' });
                }
                return res.status(500).json({ error: 'Registration failed due to a server error.' });
            }
            res.status(201).json({ id: this.lastID, message: 'User registered successfully. Please login.' });
        });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed due to a server error.' });
    }
});

authRouter.post('/login', passport.authenticate('local'), (req, res) => {
    const userInfo = {
        id: req.user.id,
        username: req.user.username,
        role: req.user.role
    };
    res.json({ message: 'Logged in successfully', user: userInfo });
});

authRouter.post('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return res.status(500).json({ message: 'Logout failed due to server error.' });
        }
        req.session.destroy((err) => {
            if (err) {}
            res.clearCookie('connect.sid');
            res.json({ message: 'Logged out successfully' });
        });
    });
});

authRouter.get('/status', (req, res) => {
    if (req.isAuthenticated()) {
        const userInfo = {
            id: req.user.id,
            username: req.user.username,
            role: req.user.role
        };
        res.json({ loggedIn: true, user: userInfo });
    } else {
        res.json({ loggedIn: false, user: null });
    }
});

app.use('/auth', authRouter);
app.use('/api/auth', authRouter);

const leaveApiRouter = express.Router();

leaveApiRouter.post('/', ensureAuthenticated, (req, res) => {
    const { type, start_date, end_date, reason } = req.body;
    const user_id = req.user.id;
    const employee_username = req.user.username;

    if (!type || !start_date || !end_date || !reason) {
        return res.status(400).json({ error: 'Missing required leave request fields.' });
    }

    const sql = `INSERT INTO leave_requests (user_id, employee_username, type, start_date, end_date, reason, status)
                 VALUES (?, ?, ?, ?, ?, ?, 'pending')`;
    db.run(sql, [user_id, employee_username, type, start_date, end_date, reason], function (err) {
        if (err) {
            return res.status(500).json({ error: 'Failed to submit leave request.' });
        }
        res.status(201).json({ message: 'Leave request submitted successfully', id: this.lastID });
    });
});

app.get('/api/leave-requests', ensureAuthenticated, (req, res) => {
    let sql;
    let params = [];

    if (req.user.role === 'admin') {
        sql = 'SELECT * FROM leave_requests ORDER BY requested_at DESC';
    } else {
        sql = 'SELECT * FROM leave_requests WHERE user_id = ? ORDER BY requested_at DESC';
        params.push(req.user.id);
    }

    db.all(sql, params, (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve leave requests.' });
        }
        res.json({ leaveRequests: rows });
    });
});

app.post('/api/leave-status', ensureAdmin, (req, res) => {
    const { id, status } = req.body;
    if (!id || !status || !['approved', 'rejected', 'pending'].includes(status)) {
        return res.status(400).json({ error: 'Invalid request. Requires id and valid status (pending, approved, rejected).' });
    }

    const sql = `UPDATE leave_requests SET status = ? WHERE id = ?`;
    db.run(sql, [status, id], function (err) {
        if (err) {
            return res.status(500).json({ error: 'Failed to update leave status.' });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Leave request not found.' });
        }
        res.json({ message: 'Leave status updated successfully', affectedRows: this.changes });
    });
});

app.use('/api/leave', leaveApiRouter);

const scheduleApiRouter = express.Router();

scheduleApiRouter.post('/record', ensureAuthenticated, (req, res) => {
    const { shift, date } = req.body;
    const user_id = req.user.id;
    const employee_username = req.user.username;

    if (!shift || !date) {
        return res.status(400).json({ error: 'Missing required fields: shift and date.' });
    }

    const sql = `INSERT INTO schedules (user_id, employee_username, shift, date) VALUES (?, ?, ?, ?)`;
    db.run(sql, [user_id, employee_username, shift, date], function (err) {
        if (err) {
            return res.status(500).json({ error: 'Failed to record schedule entry.' });
        }
        res.status(201).json({ message: `Schedule entry '${shift}' recorded successfully`, id: this.lastID });
    });
});

scheduleApiRouter.get('/', ensureAuthenticated, (req, res) => {
    const sql = 'SELECT * FROM schedules ORDER BY date DESC, created_at DESC';
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve schedule.' });
        }
        res.json({ schedule: rows });
    });
});

app.use('/api/schedule', scheduleApiRouter);

const newsApiRouter = express.Router();

newsApiRouter.get('/', (req, res) => {
    const sql = `SELECT n.id, n.title, n.content, n.created_at,
                        COALESCE(u.username, n.author_username, 'System') as author_username
                 FROM news n
                 LEFT JOIN users u ON n.author_id = u.id
                 ORDER BY n.created_at DESC`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve news feed.' });
        }
        res.json({ news: rows });
    });
});

newsApiRouter.post('/', ensureAdmin, (req, res) => {
    const { title, content } = req.body;
    const author_id = req.user.id;
    const author_username = req.user.username;

    if (!title || !content) {
        return res.status(400).json({ error: 'News title and content are required.' });
    }

    const sql = `INSERT INTO news (title, content, author_id, author_username) VALUES (?, ?, ?, ?)`;
    db.run(sql, [title, content, author_id, author_username], function (err) {
        if (err) {
            return res.status(500).json({ error: 'Failed to add news item.' });
        }
        res.status(201).json({ message: 'News item added successfully', id: this.lastID });
    });
});

app.use('/api/news', newsApiRouter);

const chatApiRouter = express.Router();

chatApiRouter.post('/', ensureAuthenticated, (req, res) => {
    const { recipient, message } = req.body;
    const sender_username = req.user.username;

    if (!recipient || !message) {
        return res.status(400).json({ success: false, error: 'Recipient and message are required.' });
    }
    if (recipient.toLowerCase() === sender_username.toLowerCase()) {
        return res.status(400).json({ success: false, error: 'Cannot send messages to yourself.' });
    }

    db.get('SELECT id FROM users WHERE username = ? COLLATE NOCASE', [recipient], (err, recipientUser) => {
        if (err) {
            return res.status(500).json({ success: false, error: 'Server error checking recipient.' });
        }
        if (!recipientUser) {
            return res.status(404).json({ success: false, error: `Recipient user '${recipient}' not found.` });
        }

        const sql = `INSERT INTO chat_messages (sender_username, recipient_username, message) VALUES (?, ?, ?)`;
        db.run(sql, [sender_username, recipient, message], function (err) {
            if (err) {
                return res.status(500).json({ success: false, error: 'Failed to send message.' });
            }
            res.status(201).json({ success: true, message: 'Message sent successfully', id: this.lastID });
        });
    });
});

chatApiRouter.get('/', ensureAuthenticated, (req, res) => {
    const current_username_lower = req.user.username.toLowerCase();
    const sql = `SELECT * FROM chat_messages
                 WHERE lower(sender_username) = ? OR lower(recipient_username) = ?
                 ORDER BY timestamp DESC`;

    db.all(sql, [current_username_lower, current_username_lower], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve chat history.' });
        }
        res.json({ chat: rows });
    });
});

app.use('/api/chat', chatApiRouter);

const debugRouter = express.Router();

debugRouter.get('/users', ensureAdmin, (req, res) => {
    db.all('SELECT id, username, role FROM users', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ data: rows });
    });
});

debugRouter.get('/leaves', ensureAdmin, (req, res) => {
    db.all('SELECT * FROM leave_requests', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ data: rows });
    });
});

app.use('/debug', debugRouter);

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'), (err) => {
        if (err) {
            res.status(404).send('404 - Not Found');
        }
    });
});

app.use((err, req, res, next) => {
    console.error("Global Error Handler Caught:", err.stack);
    res.status(err.status || 500).json({
        error: 'Something went wrong on the server.'
    });
});

app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
    console.log("Registered Routes:");
    app._router.stack.forEach(function(r){
      if (r.route && r.route.path){
        console.log(`  - ${Object.keys(r.route.methods).map(m => m.toUpperCase()).join(', ')} ${r.route.path}`);
      } else if (r.name === 'router') {
          r.handle.stack.forEach(function(handler){
              if(handler.route){
                 console.log(`  - ${Object.keys(handler.route.methods).map(m => m.toUpperCase()).join(', ')} ${r.regexp.source.replace('^','').replace('\\/?$','').replace('\\/','/')}${handler.route.path === '/' ? '' : handler.route.path}`);
              }
          });
      }
    });
     console.log("Static files served from:", path.join(__dirname, 'public'));
     console.log("HTML views served from:", path.join(__dirname, 'views'));
});
