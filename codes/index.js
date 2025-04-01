const express = require('express');
const db = require('./db'); // Import the SQLite database connection
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Root endpoint: check if the API is working
app.get('/', (req, res) => {
  res.send('Welcome to the Company Portal API');
});

// Clock In Route: expects employee, shift, and date in the request body
app.post('/api/clock-in', (req, res) => {
  const { employee, shift, date } = req.body;
  const sql = `INSERT INTO schedules (employee, shift, date) VALUES (?, ?, ?)`;
  db.run(sql, [employee, shift, date], function(err) {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Clock In successful", id: this.lastID });
  });
});

// Clock Out Route: similar to clock in for now; can be expanded later
app.post('/api/clock-out', (req, res) => {
  const { employee, shift, date } = req.body;
  const sql = `INSERT INTO schedules (employee, shift, date) VALUES (?, ?, ?)`;
  db.run(sql, [employee, shift, date], function(err) {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Clock Out successful", id: this.lastID });
  });
});

// Get Schedule Route: returns all schedule entries from the database
app.get('/api/schedule', (req, res) => {
  const sql = `SELECT * FROM schedules`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json({ schedule: rows });
  });
});

// Leave Request Route: expects employee, type, start_date, end_date, and reason in the request body
app.post('/api/leave', (req, res) => {
  const { employee, type, start_date, end_date, reason } = req.body;
  const sql = `INSERT INTO leave_requests (employee, type, start_date, end_date, reason) VALUES (?, ?, ?, ?, ?)`;
  db.run(sql, [employee, type, start_date, end_date, reason], function(err) {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Leave request submitted", id: this.lastID });
  });
});

// News Feed Route: returns static news items for now
app.get('/api/news', (req, res) => {
  res.json({ news: ["Employee of the Month: Ayman", "New product launch next month!"] });
});

// Chat Route: expects sender, recipient, and message in the request body
app.post('/api/chat', (req, res) => {
  const { sender, recipient, message } = req.body;
  const sql = `INSERT INTO chat_messages (sender, recipient, message) VALUES (?, ?, ?)`;
  db.run(sql, [sender, recipient, message], function(err) {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ success: false, error: err.message });
    }
    console.log(`Chat message from ${sender} to ${recipient}: ${message}`);
    res.json({ success: true, id: this.lastID });
  });
});

// Chat History Retrieval Route: returns all chat messages, sorted by newest first
app.get('/api/chat', (req, res) => {
  const sql = `SELECT * FROM chat_messages ORDER BY timestamp DESC`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json({ chat: rows });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
