import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import path from 'path';
import { chatbotHandler } from './api/routes/chatbot.js'; // Corrected import statement
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), 'public')));
app.use(express.json());



// Corrected the usage of chatbotHandler as an Express route handler
app.post('/chatbot', chatbotHandler);

// Contact form endpoint
app.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;

    // Configure your SMTP transporter
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, // Use environment variable for your email
            pass: process.env.EMAIL_PASS // Use environment variable for your password
        }
    });

    // Setup email data
    let mailOptions = {
        from: email, // sender address
        to: process.env.EMAIL_USER, // receiver, should be your email from environment
        subject: `New Contact Form Submission from ${name}`, // Subject line
        text: message, // plain text body
        // html: '<b>Hello world?</b>' // html body (if needed)
    };

    // Send mail with defined transport object
    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
        res.send('Email sent successfully');
    } catch (error) {
        console.error('Failed to send email', error);
        res.status(500).send('Failed to send email');
    }
});

// Dummy message route - needs implementation
app.post('/message', async (req, res) => {
  // Your code here
});

// Projects API endpoint
app.get('/api/projects', (req, res) => {
    const projects = [
        { id: 1, title: 'Project One', description: 'This is the first project' },
        { id: 2, title: 'Project Two', description: 'This is the second project' }
    ];

    res.json(projects);
});

// Serve HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
