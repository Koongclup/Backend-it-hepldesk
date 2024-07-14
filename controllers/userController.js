const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

// Fetch all users
const getUsers = async (req, res) => {
    try {
        const users = await userModel.getAllUsers();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Fetch users count
const getUsersCount = async (req, res) => {
    try {
        const count = await userModel.getUsersCount();
        res.json({ count });
    } catch (error) {
        console.error('Error fetching users count:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Add a new user
const addUser = async (req, res) => {
    const { username, password, role ,actives} = req.body;

    if (!username || !password || !role || !actives) {
        return res.status(400).json({ message: 'Username, password, and role are required' });
    }

    try {
        const newUser = await userModel.addUser(username, password, role, actives);
        res.status(201).json(newUser); // Respond with the newly created user object
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// fetch a user id
const getUserById = async (req, res) => {
    const id = req.params.id;
    try {
        const id= await userModel.getUserById(id);
        if (!id) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(id);
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        res.status(500).json({ message: 'Error fetching user by ID' });
    }
};

// Update a user
const updateUser = async (req, res) => {
    
    const id = req.params.id;
    const { username, role, actives } = req.body;

    if (!username || !role || !actives) {
        return res.status(400).json({ message: 'Username and role are required' });
    }

    try {
        const user = await userModel.getUserById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update password if provided
        /*
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 8); // Hash the password with salt rounds
            await userModel.updatePassword(id, hashedPassword);
        } */

        // Update username and role
        await userModel.updateUser(id, username, role, actives );

        res.status(204).send();
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await userModel.deleteUser(id);
        res.status(204).send();
    } catch (error) {
        console.error('Error User not found:', error);
        res.status(500).json({ message: 'Error Internal server error' });
    }
};

module.exports = { getUsers, getUsersCount, updateUser, deleteUser, addUser ,getUserById };
