const fetch = require('node-fetch'); // Make sure 'node-fetch' is installed in your project dependencies

exports.handler = async function(event, context) {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: 'Method Not Allowed'
        };
    }

    try {
        const requestBody = JSON.parse(event.body);
        const message = requestBody.message;
        const witToken = process.env.WIT_AI_TOKEN; // Make sure this is set in your Netlify environment variables

        // Make the fetch call to Wit.ai
        const witResponse = await fetch(`https://api.wit.ai/message?v=20201005&q=${encodeURIComponent(message)}`, {
            headers: { 'Authorization': `Bearer ${witToken}` }
        });

        if (!witResponse.ok) {
            // Handle different error status codes from Wit.ai
            let errorDetail = 'Unknown error occurred.';
            if (witResponse.status === 401) {
                errorDetail = 'Authentication failed. Check your WIT_AI_TOKEN.';
            } else if (witResponse.status === 500) {
                errorDetail = 'Server error on Wit.ai.';
            }
            throw new Error(`HTTP error! status: ${witResponse.status}. ${errorDetail}`);
        }

        const witData = await witResponse.json();

        // Check if Wit.ai has detected any intents
        let reply = 'I am not sure how to respond to that.';
        if (witData.intents && witData.intents.length > 0) {
            const intent = witData.intents[0].name;

            // Respond based on the detected intent
            switch (intent) {
                case 'greeting':
                    reply = 'Hello! How can I assist you today?';
                    break;
                // Add more cases for other intents you have set up in Wit.ai
                default:
                    reply = 'I am not sure what you mean.';
                    break;
            }
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ reply })
        };

    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' })
        };
    }
};
