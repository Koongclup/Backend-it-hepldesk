const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const memberController = require('../controllers/memberController');
const incidentController = require('../controllers/incidentController');
const authMiddleware = require('../middleware/authMiddleware');

// Authentication routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Incident routes
router.post('/incidents', authMiddleware.authenticateToken, incidentController.createIncident);
router.get('/incidents', authMiddleware.authenticateToken, incidentController.getIncidents);
router.put('/incidents/:id', authMiddleware.authenticateToken, incidentController.updateIncident);
router.delete('/incidents/:id', authMiddleware.authenticateToken, incidentController.deleteIncident);
router.get('/incidents/stats', authMiddleware.authenticateToken, incidentController.getIncidentStats); 
router.get('/incidents/:id', authMiddleware.authenticateToken, incidentController.getIncidentById);

//not login
router.post('/jobnews', incidentController.createJob);
router.get('/jobnews', incidentController.getIncidents);
router.get('/typeincidents',  incidentController.getTypeIncidents);
router.put('/jobnews/:id',  incidentController.updateIncident);
router.delete('/jobnews/:id',  incidentController.deleteIncident);
router.get('/jobnews/stats',  incidentController.getIncidentStats); 
router.get('/jobnews/:id',  incidentController.getIncidentById);

// User management routes
router.get('/users/count', authMiddleware.authenticateToken,  userController.getUsersCount);
router.get('/users', authMiddleware.authenticateToken,  userController.getUsers);
router.post('/users', authMiddleware.authenticateToken,  userController.addUser);
router.put('/users/:id', authMiddleware.authenticateToken,  userController.updateUser);
router.delete('/users/:id', authMiddleware.authenticateToken,  userController.deleteUser);
router.get('/users/:id', authMiddleware.authenticateToken, userController.getUserById);


// User management routes
router.get('/users/count',   userController.getUsersCount);
router.get('/users',  userController.getUsers);
router.post('/users',   userController.addUser);
router.put('/users/:id',   userController.updateUser);
router.delete('/users/:id',   userController.deleteUser);
router.get('/users/:id',  userController.getUserById);


// User management routes
router.get('/members/count', authMiddleware.authenticateToken,  memberController.getMembersCount);
router.get('/members', authMiddleware.authenticateToken,  memberController.getMembers);
router.post('/members', authMiddleware.authenticateToken,  memberController.addMember);
router.put('/members/:id', authMiddleware.authenticateToken, memberController.updateMember);
router.delete('/members/:id', authMiddleware.authenticateToken,  memberController.deleteMember);
router.get('/members/:id', authMiddleware.authenticateToken, memberController.getMemberById);
router.get('/listusers',   memberController.getMembers);

module.exports = router;
