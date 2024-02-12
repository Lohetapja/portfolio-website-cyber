import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();
const witToken = process.env.WIT_AI_TOKEN; // Ensure you have this in your .env file

router.post('/', async (req, res) => {
    const { message } = req.body;

    try {
        // Send the user's message to Wit.ai for processing
        const witResponse = await fetch(`https://api.wit.ai/message?v=20201005&q=${encodeURIComponent(message)}`, {
            headers: { 'Authorization': `Bearer ${witToken}` }
        });
        const witData = await witResponse.json();

        // Handle the Wit.ai response here
        // For example, extract the intent and formulate a reply based on that intent
        const intent = witData.entities['intent'][0].value; // This will depend on your Wit.ai configuration

        // Formulate a reply
        let reply = 'I am not sure how to respond to that.';
        if (intent === 'greeting') {
            reply = 'Hello! How can I help you today?';
        }
        // Add more conditions based on your intents

        res.json({ reply });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Something went wrong while trying to talk to Wit.ai' });
    }
});

export default router;