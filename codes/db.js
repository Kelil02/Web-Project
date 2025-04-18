const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./company.db', (err) => {
  if (err) {
    return console.error('Error opening database:', err.message);
  }
  console.log('Connected to the SQLite database.');
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS schedules (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    employee TEXT,
    shift TEXT,
    date TEXT
  )`, (err) => {
    if (err) console.error(err.message);
  });

  db.run(`CREATE TABLE IF NOT EXISTS leave_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    employee TEXT,
    type TEXT,
    start_date TEXT,
    end_date TEXT,
    reason TEXT
  )`, (err) => {
    if (err) console.error(err.message);
  });

  db.run(`CREATE TABLE IF NOT EXISTS chat_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sender TEXT,
    recipient TEXT,
    message TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )`, (err) => {
    if (err) console.error(err.message);
  });
  
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  )`, (err) => {
    if (err) console.error(err.message);
  });
});

module.exports = db;
