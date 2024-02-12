// chatbot.mjs
import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();
const witToken = process.env.WIT_AI_TOKEN; // Ensure you have this in your .env file

router.post('/', async (req, res) => {
    const { message } = req.body;

    try {
        const witResponse = await fetch(`https://api.wit.ai/message?v=20201005&q=${encodeURIComponent(message)}`, {
            headers: { 'Authorization': `Bearer ${witToken}` }
        });

        if (!witResponse.ok) {
            throw new Error(`HTTP error! status: ${witResponse.status}`);
        }

        const witData = await witResponse.json();

        if (!witData.entities || !witData.entities.intent || witData.entities.intent.length === 0) {
            throw new Error('No intent found');
        }

        const intent = witData.entities.intent[0].value;
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
