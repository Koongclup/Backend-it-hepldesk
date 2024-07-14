const pool = require('../config/db');

const getUserByUsername = async (username) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    return rows[0];
};

const addUser = async (username, password, role , actives) => {
    const [result] = await pool.query('INSERT INTO users (username, password, role, actives) VALUES (?, ?, ?,?)', [username, password, role, actives]);
    return result.insertId;
};


const getUsersCount = async () => {
    const [rows] = await pool.query('SELECT COUNT(*) AS count FROM users');
    return rows[0].count;
};

const getAllUsers = async () => {
    const [rows] = await pool.query('SELECT * FROM users');
    return rows;
};

const updateUser = async (id, username, role, actives ) => {
    await pool.query('UPDATE users SET username = ?, role = ?, actives = ?  WHERE id = ?', [username, role, actives, id]);
};

const deleteUser = async (id) => {
    await pool.query('DELETE FROM users WHERE id = ?', [id]);
};

const getUserById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
};

module.exports = {getUserByUsername,getUserById,addUser, getAllUsers,updateUser,deleteUser,getUsersCount};