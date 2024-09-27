// Server-side code (Node.js with Express)
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from the 'public' directory

// MySQL connection setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cineflix'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected');
});
const cors = require('cors');
app.use(cors());


// Signup Route (Ensure this is a POST route)
app.post('/signup', (req, res) => {
    const { username, email, password } = req.body;

    const query = `INSERT INTO user (username, email, password) VALUES ('${username}', '${email}', '${password}')`;
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send('Error in signup process');
        }
        return res.status(200).send({ message: 'Signup successful!' });
    });
});
// Login Route (Handle POST request from login form)
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const query = `SELECT * FROM user WHERE username = ? AND password = ?`;
    db.query(query, [username, password], (err, results) => {
        if (err) {
            return res.status(500).send('Error in login process');
        }
        if (results.length > 0) {
            return res.status(200).send({ message: 'Login successful!' });
        } else {
            return res.status(401).send({ error: 'Invalid username or password' });
        }
    });
});


// Start the server
app.listen(5501, () => {
    console.log('Server is running on port 5501');
});
