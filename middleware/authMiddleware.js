const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(401); // Unauthorized

    jwt.verify(token.replace('Bearer ', ''), 'your_jwt_secret', (err, user) => {
        if (err) return res.sendStatus(403); // Forbidden
        req.user = user;
        next();
    });
};

const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.sendStatus(403); // Forbidden
    }
    next();
};

module.exports = { authenticateToken, isAdmin };