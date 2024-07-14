const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const register = async (req, res) => {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await userModel.createUser(username, hashedPassword, role);
    res.status(201).json({ id: userId });
};

const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await userModel.getUserByUsername(username);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user.id, role: user.role }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token, role: user.role });
};

module.exports = { register, login };
