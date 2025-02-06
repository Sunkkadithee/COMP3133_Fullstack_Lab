const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();

// Render Signup page
router.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/views/signup.html');
});

// Handle Signup form submission
router.post('/signup', async (req, res) => {
    const { username, firstname, lastname, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, firstname, lastname, password: hashedPassword });

    try {
        await newUser.save();
        res.redirect('/login');
    } catch (error) {
        res.status(500).send('Error creating account.');
    }
});

// Render Login page
router.get('/login', (req, res) => {
    res.sendFile(__dirname + '/views/login.html');
});

// Handle Login form submission (authentication logic should be added)
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    User.findOne({ username }, async (err, user) => {
        if (err || !user) {
            return res.status(400).send('User not found');
        }

        const match = await bcrypt.compare(password, user.password);
        if (match) {
            res.redirect('/chat');
        } else {
            res.status(400).send('Invalid credentials');
        }
    });
});

module.exports = router;
