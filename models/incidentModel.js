const pool = require('../config/db');

const createIncident = async (title, description,jobtype,requestby ,userId) => {
    const [result] = await pool.query('INSERT INTO incidents (title, description,jobtype,requestby, user_id) VALUES (?, ?, ?, ?,?)', [title, description,jobtype,requestby, userId]);
    return result.insertId;
};

const createJob = async (title, description,jobtype,requestby ) => {
    const [result] = await pool.query('INSERT INTO incidents (title, description,jobtype,requestby) VALUES (?, ?, ?, ?)', [title, description,jobtype,requestby]);
    return result.insertId;
};

const getAllIncidents = async () => {
    const [rows] = await pool.query('SELECT i.*,date(i.create_date) cdate FROM incidents i order by i.id desc');
    return rows;
};

const getTypeIncidents = async () => {
    const [rows] = await pool.query('SELECT id,list_unit FROM tb_support_list');
    return rows;
};
const updateIncident = async (id, title, description, status) => {
    await pool.query('UPDATE incidents SET title = ?, description = ?, status = ? WHERE id = ?', [title, description, status,id]);
};

const deleteIncident = async (id) => {
    await pool.query('DELETE FROM incidents WHERE id = ?', [id]);
};

const countIncidents = async () => {
    const [result] = await pool.query('SELECT COUNT(*) as count FROM incidents');
    return result[0].count;
};

const countIncidentsByStatus = async (status) => {
    const [result] = await pool.query('SELECT COUNT(*) as count FROM incidents WHERE status = ?', [status]);
    return result[0].count;
};

const getIncidentById = async (id) => {
    const [result] = await pool.query('SELECT * FROM incidents WHERE id = ?', [id]);
    return result[0];
};

module.exports = {
    createIncident,
    createJob,
    getAllIncidents,
    updateIncident,
    deleteIncident,
    countIncidents,
    countIncidentsByStatus,
    getIncidentById,
    getTypeIncidents
};
