const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '000305',
  database: 'upstore'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database: ', err);
  }
  console.log('Connected to MySQL database!');
});

module.exports = db;