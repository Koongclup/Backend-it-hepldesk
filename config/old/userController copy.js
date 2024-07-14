const db = require('../config/db');

let users = [];

const getUsers = (req, res) => {
    res.json(users);
};

const addUser = (req, res) => {
    const { username, password, role } = req.body;
    const newUser = { id: users.length + 1, username, password, role };
    users.push(newUser);
    res.status(201).json({ message: 'User added successfully', user: newUser });
};

const updateUser = (req, res) => {
    const { id } = req.params;
    const { username, password, role } = req.body;
    const user = users.find(u => u.id === parseInt(id));
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    user.username = username;
    user.password = password;
    user.role = role;
    res.json({ message: 'User updated successfully', user });
};

const deleteUser = (req, res) => {
    const { id } = req.params;
    users = users.filter(u => u.id !== parseInt(id));
    res.json({ message: 'User deleted successfully' });
};

module.exports = { getUsers, addUser, updateUser, deleteUser };