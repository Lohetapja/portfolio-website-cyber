import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import path from 'path';
import chatbotRoutes from './api/routes/chatbot.mjs';
import cors from 'cors';

dotenv.config();

const app = express();


app.use(cors()); // This will enable CORS for all routes
// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), 'public')));

app.use(express.json()); // Middleware to parse JSON bodies
app.use('/chatbot', chatbotRoutes); // Use the chatbot routes

// Contact form endpoint
app.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;

    // Configure your SMTP transporter
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'yourEmail@example.com', // Your email
            pass: 'yourEmailPassword' // Your password
        }
    });

    // Setup email data
    let mailOptions = {
        from: email, // sender address
        to: 'yourEmail@example.com', // list of receivers
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

app.post('/message', async (req, res) => {
  // Implementation from the previous example
});

// Projects API endpoint (example)
app.get('/api/projects', (req, res) => {
    // Dummy projects data
    const projects = [
        { id: 1, title: 'Project One', description: 'This is the first project' },
        { id: 2, title: 'Project Two', description: 'This is the second project' }
        // Add more projects as needed
    ];

    res.json(projects);
});

// Serve HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// More routes can be added here

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});