// server.js

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Create a new Express app
const app = express();

// Serve the static files from the "public" directory
app.use(express.static(__dirname + '/public'));

// Create an HTTP server and integrate with Socket.IO
const server = http.createServer(app);
const io = socketIo(server);

// Handle connection events
io.on('connection', (socket) => {
    console.log('A user connected');

    // When a user sends a message
    socket.on('chat message', (data) => {
        io.emit('chat message', data); // Broadcast the message to all users
    });

    // When a user disconnects
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Start the server on port 3000
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

