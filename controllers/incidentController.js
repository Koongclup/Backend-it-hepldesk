const incidentModel = require('../models/incidentModel');

const createIncident = async (req, res) => {
    try {
        const { title, description,jobtype,requestby} = req.body;
        const userId = req.user.userId; // assuming req.user contains the authenticated user's info
        const incidentId = await incidentModel.createIncident(title, description,jobtype, requestby, userId);
        res.status(201).json({ id: incidentId });
    } catch (error) {
        console.error('Error creating incident:', error);
        res.status(500).json({ message: 'Error creating incident' });
    }
};

const createJob = async (req, res) => {
    try {
        const { title, description,jobtype,requestby} = req.body;

        const incidentId = await incidentModel.createIncident(title, description,jobtype, requestby);
        res.status(201).json({ id: incidentId });
    } catch (error) {
        console.error('Error creating incident:', error);
        res.status(500).json({ message: 'Error creating incident' });
    }
};

const getIncidents = async (req, res) => {
    try {
        const incidents = await incidentModel.getAllIncidents();
        res.json(incidents);
    } catch (error) {
        console.error('Error fetching incidents:', error);
        res.status(500).json({ message: 'Error fetching incidents' });
    }
};

const getTypeIncidents = async (req, res) => {
    try {
        const typeincidents = await incidentModel.getTypeIncidents();
        res.json(typeincidents);
    } catch (error) {
        console.error('Error fetching incidents:', error);
        res.status(500).json({ message: 'Error fetching incidents' });
    }
};

const updateIncident = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description,status } = req.body;
        await incidentModel.updateIncident(id, title, description,status);
        res.status(204).send();
    } catch (error) {
        console.error('Error updating incident:', error);
        res.status(500).json({ message: 'Error updating incident' });
    }
};

const deleteIncident = async (req, res) => {
    try {
        const { id } = req.params;
        await incidentModel.deleteIncident(id);
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting incident:', error);
        res.status(500).json({ message: 'Error deleting incident' });
    }
};

const getIncidentStats = async (req, res) => {
    try {
        const totalIncidents = await incidentModel.countIncidents();
        const openIncidents = await incidentModel.countIncidentsByStatus('open');
        const inprogressIncidents = await incidentModel.countIncidentsByStatus('in progress');
        const closedIncidents = await incidentModel.countIncidentsByStatus('closed');

        res.json({
            total: totalIncidents,
            open: openIncidents,
            inprogress: inprogressIncidents,
            closed: closedIncidents
        });
    } catch (error) {
        console.error('Error fetching incident stats:', error);
        res.status(500).json({ message: 'Error fetching incident stats' });
    }
};

const getIncidentById = async (req, res) => {
    try {
        const { id } = req.params;
        const incident = await incidentModel.getIncidentById(id);
        if (incident) {
            res.status(200).json(incident);
        } else {
            res.status(404).json({ message: 'Incident not found' });
        }
    } catch (error) {
        console.error('Error retrieving incident:', error);
        res.status(500).json({ message: 'Error retrieving incident' });
    }
};

module.exports = { createIncident, createJob, getIncidents, updateIncident, deleteIncident, getIncidentStats,getIncidentById,getTypeIncidents };
