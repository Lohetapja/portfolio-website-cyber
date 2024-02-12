// functions/chatbot.js
const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const witToken = process.env.WIT_AI_TOKEN;
  const message = JSON.parse(event.body).message;

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

    return {
      statusCode: 200,
      body: JSON.stringify({ reply }),
      headers: {
        'Content-Type': 'application/json'
      }
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Something went wrong while trying to talk to Wit.ai' }),
    };
  }
};