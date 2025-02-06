const express = require('express');
const mongoose = require('mongoose');
const socketIo = require('socket.io');
const http = require('http');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const GroupMessage = require('./models/GroupMessage');
const app = express();

// MongoDB connection details
const DB_NAME = "labtestFullstack";
const DB_USER_NAME = "panglabtest";
const DB_PASSWORD = 'VvbYSZlFZcvcaNbc';
const CLUSTER_ID = 'gxk3a';

// MongoDB URI (Connection string)
const DB_CONNECTION = `mongodb+srv://${DB_USER_NAME}:${DB_PASSWORD}@cluster0.${CLUSTER_ID}.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

// Connect to MongoDB
mongoose.connect(DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully!'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// Setup Express and Socket.io
const server = http.createServer(app);
const io = socketIo(server);

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Routes for serving HTML pages
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/welcome.html');
});

app.get('/signup', (req, res) => {
  res.sendFile(__dirname + '/views/signup.html');
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/views/login.html');
});

// Chat page with dynamic room handling
app.get('/chat/:room', (req, res) => {
    const room = req.params.room;
    res.sendFile(__dirname + '/views/chat-room.html');
});

// API endpoint for signup
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { username, firstname, lastname, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, firstname, lastname, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'Signup successful!' });
  } catch (err) {
    res.status(500).json({ message: 'Error during signup', error: err });
  }
});

// API endpoint for login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    res.status(200).json({ message: 'Login successful', token: 'fake-jwt-token' });
  } catch (err) {
    res.status(500).json({ message: 'Error during login', error: err });
  }
});

// Socket.io chat functionality
const rooms = ['general', 'tech', 'gaming']; // Predefined rooms for demo

io.on('connection', (socket) => {
    let currentRoom = null;
    let currentUser = null;

    console.log('A user connected:', socket.id);

    // Join room
    socket.on('joinRoom', ({ username, room }) => {
        if (!rooms.includes(room)) {
            return socket.emit('message', 'Invalid room');
        }
        
        currentUser = username;
        currentRoom = room;
        socket.join(room);
        
        console.log(`${username} joined room: ${room}`);

        // Emit welcome message to the user
        socket.emit('message', `Welcome to the ${room} room, ${username}!`);
        socket.to(room).broadcast.emit('message', `${username} has joined the room`);

        // Fetch and send previous messages
        GroupMessage.find({ room }).sort({ timestamp: 1 }).limit(10)
          .then(messages => {
            socket.emit('previousMessages', messages);
          })
          .catch(err => console.log('Error fetching messages:', err));
    });

    // Send chat message
    socket.on('chatMessage', ({ username, room, message }) => {
        const newMessage = new GroupMessage({
            username,
            room,
            message
        });

        newMessage.save()
          .then(() => {
            io.to(room).emit('message', `${username}: ${message}`);
          })
          .catch(err => console.log('Error saving message:', err));
    });

    // Typing indicator
    socket.on('typing', ({ username, room }) => {
        socket.to(room).emit('message', `${username} is typing...`);
    });

    // Leave room
    socket.on('leaveRoom', () => {
        if (currentRoom) {
            socket.leave(currentRoom);
            console.log(`${currentUser} left room: ${currentRoom}`);
            socket.to(currentRoom).broadcast.emit('message', `${currentUser} has left the room`);
            currentRoom = null;
            currentUser = null;
        }
    });

    // Handle user disconnect
    socket.on('disconnect', () => {
        if (currentRoom) {
            socket.to(currentRoom).broadcast.emit('message', `${currentUser} has left the room`);
        }
        console.log('User disconnected:', socket.id);
    });
});

// Start server on port 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
