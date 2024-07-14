const pool = require('../config/db');

const getAllMembers = async () => {
    const [rows] = await pool.query('SELECT * FROM tb_users');
    return rows;
};

module.exports = { getAllMembers};