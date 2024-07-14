const express = require('express');
const router = express.Router();
const authController = require('../../controllers/authController');
const userController = require('../../controllers/userController');
const incidentController = require('../../controllers/incidentController');
const authMiddleware = require('../../middleware/authMiddleware');

// Authentication routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Incident routes
router.post('/incidents', authMiddleware.authenticateToken, incidentController.createIncident);
router.get('/incidents', authMiddleware.authenticateToken, incidentController.getIncidents);
router.put('/incidents/:id', authMiddleware.authenticateToken, incidentController.updateIncident);
router.delete('/incidents/:id', authMiddleware.authenticateToken, incidentController.deleteIncident);
router.get('/incidents/stats', authMiddleware.authenticateToken, incidentController.getIncidentStats); 


// User management routes
router.get('/users', authMiddleware.authenticateToken, authMiddleware.isAdmin, userController.getUsers);
router.put('/users/:id', authMiddleware.authenticateToken, authMiddleware.isAdmin, userController.updateUser);
router.delete('/users/:id', authMiddleware.authenticateToken, authMiddleware.isAdmin, userController.deleteUser);

module.exports = router;
