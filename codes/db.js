const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'company.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
        process.exit(1);
    }
    console.log('Connected to database.');
});

// Enable foreign keys
db.run('PRAGMA foreign_keys = ON;');

// Create tables
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL COLLATE NOCASE,
        password TEXT NOT NULL,
        role TEXT DEFAULT 'employee' CHECK(role IN ('employee', 'admin')) NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS schedules (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        employee_username TEXT NOT NULL,
        shift TEXT NOT NULL,
        date TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS leave_requests (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        employee_username TEXT NOT NULL,
        type TEXT NOT NULL CHECK(type IN ('sick', 'vacation')),
        start_date TEXT NOT NULL,
        end_date TEXT NOT NULL,
        reason TEXT NOT NULL,
        status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'approved', 'rejected')) NOT NULL,
        requested_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS chat_messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sender_username TEXT NOT NULL COLLATE NOCASE,
        recipient_username TEXT NOT NULL COLLATE NOCASE,
        message TEXT NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS news (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        author_id INTEGER,
        author_username TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS news_reactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        news_id INTEGER NOT NULL,
        user_id INTEGER NOT NULL,
        reaction TEXT NOT NULL CHECK(reaction IN ('like', 'thumbsup', 'heart')),
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (news_id) REFERENCES news(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        UNIQUE(news_id, user_id, reaction)
    )`);
});

//sample schedules
db.get("SELECT COUNT(*) AS count FROM schedules", (err, row) => {
    if (!err && row.count === 0) {
        const stmt = db.prepare("INSERT INTO schedules (employee_username, shift, date) VALUES (?, ?, ?)");
        stmt.run("Majd", "Morning Shift", "2025-05-01");
        stmt.run("Kelil", "Evening Shift", "2025-05-01");
        stmt.finalize();
        console.log('Sample schedules seeded.');
    }
});

// sample news
db.get("SELECT COUNT(*) AS count FROM news", (err, row) => {
    if (!err && row.count === 0) {
        const stmt = db.prepare("INSERT INTO news (title, content, author_username) VALUES (?, ?, ?)");
        stmt.run("Welcome to PLIVM!", "This is the new platform for managing company tasks and communication. Explore the features!", "Kelil");
        stmt.run("Q2 Goals Announced", "Please review the latest quarterly goals posted on the internal drive. Let's make this quarter a success!", "Kelil");
        stmt.run("Reminder: Time Sheets Due", "Please submit your time sheets for the previous week by end of day today.", "Majd HR");
        stmt.finalize();
        console.log('Sample news seeded.');
    }
});

// Handle shutdown
process.on('SIGINT', () => {
    console.log('Closing database connection...');
    db.close((err) => {
        if (err) {
            console.error('Error closing database:', err.message);
            process.exit(1);
        }
        console.log('Database connection closed.');
        process.exit(0);
    });
});

module.exports = db;
