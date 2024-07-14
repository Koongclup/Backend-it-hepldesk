const db = require('../config/db');

exports.createIncident = (req, res) => {
    const { title, description, status } = req.body;

    db.execute('INSERT INTO incidents (title, description, status) VALUES (?, ?, ?)', [title, description, status])
        .then(result => res.status(201).json({ message: 'Incident created successfully' }))
        .catch(err => res.status(500).json({ error: err.message }));
};

exports.getIncidents = (req, res) => {
    db.execute('SELECT * FROM incidents')
        .then(([rows]) => res.status(200).json(rows))
        .catch(err => res.status(500).json({ error: err.message }));
};

exports.updateIncident = (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;

    db.execute('UPDATE incidents SET title = ?, description = ?, status = ? WHERE id = ?', [title, description, status, id])
        .then(result => res.status(200).json({ message: 'Incident updated successfully' }))
        .catch(err => res.status(500).json({ error: err.message }));
};

exports.deleteIncident = (req, res) => {
    const { id } = req.params;

    db.execute('DELETE FROM incidents WHERE id = ?', [id])
        .then(result => res.status(200).json({ message: 'Incident deleted successfully' }))
        .catch(err => res.status(500).json({ error: err.message }));
};

exports.getReport = (req, res) => {
    db.execute('SELECT status, COUNT(*) AS count FROM incidents GROUP BY status')
        .then(([rows]) => res.status(200).json(rows))
        .catch(err => res.status(500).json({ error: err.message }));
};
