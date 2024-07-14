const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 8);

    db.execute('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, hashedPassword, role])
        .then(result => res.status(201).json({ message: 'User registered successfully' }))
        .catch(err => res.status(500).json({ error: err.message }));
};

exports.login = (req, res) => {
    const { username, password } = req.body;

    db.execute('SELECT * FROM users WHERE username = ?', [username])
        .then(([rows]) => {
            if (rows.length === 0) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const user = rows[0];

            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    const token = jwt.sign({ userId: user.id, role: user.role }, 'secretkey', { expiresIn: '1h' });
                    res.status(200).json({ token, role: user.role });
                } else {
                    res.status(401).json({ message: 'Invalid credentials' });
                }
            });
        })
        .catch(err => res.status(500).json({ error: err.message }));
};


