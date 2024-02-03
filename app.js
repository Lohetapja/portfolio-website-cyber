const express = require('express');
const net = require('net');
const path = require('path');

const app = express();

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');


app.use(bodyParser.urlencoded({ extended: true }));

app.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;

    let transporter = nodemailer.createTransport({
        service: 'gmail', // Use your preferred SMTP service
        auth: {
            user: 'yourEmail@example.com',
            pass: 'yourEmailPassword'
        }
    });

    let mailOptions = {
        from: email,
        to: 'yourEmail@example.com',
        subject: `New Contact Form Submission from ${name}`,
        text: message
    };

    try {
        await transporter.sendMail(mailOptions);
        res.send('Email sent successfully');
    } catch (error) {
        console.error('Failed to send email', error);
        res.send('Failed to send email');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});




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
