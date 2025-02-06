const express = require('express');
const router = express.Router();

// Route for general chat page (this can be the main chat page or the default one)
router.get('/chat/:room', (req, res) => {
    const room = req.params.room; // Capture the room name from the URL
    res.sendFile(__dirname + '/../views/chat.html'); // Send the chat page (assuming chat.html is in the 'views' folder)
});

module.exports = router;
