const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { findUserByUsername, addUser } = require('../models/userModel');
const authenticateJWT = require('../middleware/auth');

const router = express.Router();

// Sign up route
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    const existingUser = await findUserByUsername(username);
    if (existingUser) {
        return res.status(400).send('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    await addUser({ username, password: hashedPassword });
    
    res.status(201).send('User registered successfully');
});

// Login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await findUserByUsername(username);
    if (!user) {
        return res.status(404).send('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).send('Invalid credentials');
    }

    const token = jwt.sign({ username }, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
});

// Protected route example
router.get('/protected', authenticateJWT, (req, res) => {
    res.send(`This is a protected route. Welcome ${req.user.username}!`);
});

module.exports = router;
