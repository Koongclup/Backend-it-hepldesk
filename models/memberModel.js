const pool = require('../config/db');

const getMemberByUsername = async (username) => {
    const [rows] = await pool.query('SELECT * FROM tb_users WHERE username = ?', [username]);
    return rows[0];
};

const addMember = async (username, password, role , actives) => {
    const [result] = await pool.query('INSERT INTO tb_users (username, password, role, actives) VALUES (?, ?, ?, ?)', [username, password, role, , actives]);
    return result.insertId;
};

const getMembersCount = async () => {
    const [rows] = await pool.query('SELECT COUNT(*) AS count FROM tb_users');
    return rows[0].count;
};

const getAllMembers = async () => {
    const [rows] = await pool.query('SELECT * FROM tb_users');
    return rows;
};

const updateMember = async (id, username, role, actives ) => {
    await pool.query('UPDATE tb_users SET username = ?, role = ?, actives = ?  WHERE id = ?', [username, role, actives, id]);
};

const deleteMember = async (id) => {
    await pool.query('DELETE FROM tb_users WHERE id = ?', [id]);
};

const getMemberById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM tb_users WHERE id = ?', [id]);
    return rows[0];
};

module.exports = {getMemberByUsername,getMemberById,addMember, getAllMembers,updateMember,deleteMember,getMembersCount};