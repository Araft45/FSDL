const express = require('express');
const { createUser, getUsers, getUserById, updateUser, deleteUser } = require('../models/userModel');
const router = express.Router();

// CREATE user
router.post('/users', async (req, res) => {
    const { name, email } = req.body;
    try {
        const user = await createUser(name, email);
        res.status(201).json(user);
    } catch (err) {
        res.status(500).send('Error creating user');
    }
});

// READ all users
router.get('/users', async (req, res) => {
    try {
        const users = await getUsers();
        res.json(users);
    } catch (err) {
        res.status(500).send('Error fetching users');
    }
});

// READ a single user by ID
router.get('/users/:id', async (req, res) => {
    try {
        const user = await getUserById(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).send('User not found');
        }
    } catch (err) {
        res.status(500).send('Error fetching user');
    }
});

// UPDATE user by ID
router.put('/users/:id', async (req, res) => {
    const { name, email } = req.body;
    try {
        const user = await updateUser(req.params.id, name, email);
        if (user) {
            res.json(user);
        } else {
            res.status(404).send('User not found');
        }
    } catch (err) {
        res.status(500).send('Error updating user');
    }
});

// DELETE user by ID
router.delete('/users/:id', async (req, res) => {
    try {
        await deleteUser(req.params.id);
        res.status(204).send();
    } catch (err) {
        res.status(500).send('Error deleting user');
    }
});

module.exports = router;
