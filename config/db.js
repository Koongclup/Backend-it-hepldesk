const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: '192.168.212.50',
    user: 'sa',
    password: '7188455',
    database: 'it_helpdesk',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    charset: 'utf8' // Set the character set to UTF-8
});

pool.on('connection', (connection) => {
    connection.query('SET NAMES utf8', (err) => {
        if (err) {
            console.error('Error setting character set for connection:', err);
        }
    });
});

module.exports = pool;
