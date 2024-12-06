// Import required modules
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
console.log('ss')
// Initialize the app and server
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the "public" directory
app.use(express.static('public'));

// Handle incoming connections from clients
io.on('connection', (socket) => {
  console.log('A user connected');
  
  // Handle incoming messages from clients
  socket.on('chat message', (msg) => {
    console.log('Message received: ' + msg);
    // Broadcast the message to all clients
    io.emit('chat message', msg);
  });

  // Handle user disconnect
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
