const memberModel = require('../models/memberModel');
const bcrypt = require('bcrypt');

// Fetch all Members
const getMembers = async (req, res) => {
    try {
        const Members = await memberModel.getAllMembers();
        res.json(Members);
    } catch (error) {
        console.error('Error fetching Members:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Fetch Members count
const getMembersCount = async (req, res) => {
    try {
        const count = await memberModel.getMembersCount();
        res.json({ count });
    } catch (error) {
        console.error('Error fetching Members count:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Add a new Member
const addMember = async (req, res) => {
    const { Membername, password, role ,actives} = req.body;

    if (!Membername || !password || !role || !actives) {
        return res.status(400).json({ message: 'Membername, password, and role are required' });
    }

    try {
        const newMember = await memberModel.addMember(Membername, password, role);
        res.status(201).json(newMember); // Respond with the newly created Member object
    } catch (error) {
        console.error('Error adding Member:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// fetch a Member id
const getMemberById = async (req, res) => {
    const id = req.params.id;
    try {
        const id= await memberModel.getMemberById(id);
        if (!id) {
            return res.status(404).json({ message: 'Member not found' });
        }
        res.status(200).json(id);
    } catch (error) {
        console.error('Error fetching Member by ID:', error);
        res.status(500).json({ message: 'Error fetching Member by ID' });
    }
};

// Update a Member
const updateMember = async (req, res) => {
    
    const id = req.params.id;
    const { Membername, role, actives } = req.body;

    if (!Membername || !role || !actives) {
        return res.status(400).json({ message: 'Membername and role are required' });
    }

    try {
        const Member = await memberModel.getMemberById(id);
        if (!Member) {
            return res.status(404).json({ message: 'Member not found' });
        }

        // Update password if provided
        /*
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 8); // Hash the password with salt rounds
            await MemberModel.updatePassword(id, hashedPassword);
        } */

        // Update Membername and role
        await memberModel.updateMember(id, Membername, role, actives );

        res.status(204).send();
    } catch (error) {
        console.error('Error updating Member:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a Member
const deleteMember = async (req, res) => {
    try {
        const { id } = req.params;
        await memberModel.deleteMember(id);
        res.status(204).send();
    } catch (error) {
        console.error('Error Member not found:', error);
        res.status(500).json({ message: 'Error Internal server error' });
    }
};

module.exports = { getMembers, getMembersCount, updateMember, deleteMember, addMember ,getMemberById };
