const express = require('express');
const net = require('net');
const path = require('path');

const app = express();

// Helper function to find an open port
const findOpenPort = (port, callback) => {
  const server = net.createServer();

  server.listen(port, () => {
    server.once('close', () => {
      callback(port);
    });
    server.close();
  });

  server.on('error', () => {
    findOpenPort(port + 1, callback); // If current port in use, check the next one
  });
};

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define API endpoint for projects
const projects = [
  // ... Your projects data ...
];

app.get('/api/projects', (req, res) => {
  res.json(projects);
});

// Function to start the server on an open port
const startServer = (openPort) => {
  app.listen(openPort, () => {
    console.log(`Server listening on port ${openPort}`);
  });
};

// Find an open port starting at 3000 and start the server
findOpenPort(3000, startServer);
