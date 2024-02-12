// /netlify/functions/chatbot.js
const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const body = JSON.parse(event.body);
    const message = body.message;
    const witToken = process.env.WIT_AI_TOKEN; // Set in Netlify environment variables

    // Send the user's message to Wit.ai for processing
    const witResponse = await fetch(`https://api.wit.ai/message?v=20201005&q=${encodeURIComponent(message)}`, {
      headers: { 'Authorization': `Bearer ${witToken}` }
    });
    const witData = await witResponse.json();

    // Check if entities and intent exist in the response
    if (!witData.entities || !witData.entities.intent || witData.entities.intent.length === 0) {
      throw new Error('No intent found');
    }

    const intent = witData.entities.intent[0].value;
    let reply = 'I am not sure how to respond to that.';

    if (intent === 'greeting') {
      reply = 'Hello! How can I help you today?';
    }

    // Add more conditions based on your intents

    return {
      statusCode: 200,
      body: JSON.stringify({ reply })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Something went wrong while trying to talk to Wit.ai' })
    };
  }
};
