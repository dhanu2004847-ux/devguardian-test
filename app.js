const express = require('express');
const { exec } = require('child_process');
const fs = require('fs');
const crypto = require('crypto');
const mysql = require('mysql');

const app = express();
app.use(express.json());

// 1. Hardcoded secret
const DB_PASSWORD = 'SuperSecret123!';
const API_KEY = 'AKIAIOSFODNN7EXAMPLE';

const db = mysql.createConnection({ host: 'localhost', user: 'root', password: DB_PASSWORD });

// 2. SQL injection: user input concatenated into the query
app.get('/user', (req, res) => {
  db.query("SELECT * FROM users WHERE id = " + req.query.id, (err, rows) => res.json(rows));
});

// 3. Command injection: user input passed to the shell
app.get('/ping', (req, res) => {
  exec('ping -c 1 ' + req.query.host, (err, out) => res.send(out));
});

// 4. Code injection: eval on user input
app.post('/calc', (req, res) => {
  res.send(String(eval(req.body.expression)));
});

// 5. Path traversal: user-controlled file path
app.get('/file', (req, res) => {
  res.send(fs.readFileSync('./uploads/' + req.query.name, 'utf8'));
});

// 6. Reflected XSS: unescaped input in the HTML response
app.get('/hello', (req, res) => {
  res.send('<h1>Hello ' + req.query.name + '</h1>');
});

// 7. Weak hashing and insecure randomness
app.post('/register', (req, res) => {
  const hash = crypto.createHash('md5').update(req.body.password).digest('hex');
  const token = Math.random().toString(36);
  res.json({ hash, token });
});

app.listen(3000);
