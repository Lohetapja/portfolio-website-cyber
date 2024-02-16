const fetch = require('node-fetch'); // Ensure node-fetch is installed

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
    const witToken = process.env.WIT_AI_TOKEN; // Set this in your Netlify environment variables

    const witResponse = await fetch(`https://api.wit.ai/message?v=20201005&q=${encodeURIComponent(message)}`, {
      headers: { 'Authorization': `Bearer ${witToken}` }
    });

    if (!witResponse.ok) {
      throw new Error(`HTTP error! status: ${witResponse.status}`);
    }

    const witData = await witResponse.json();
    let reply = 'I am not sure how to respond to that.';

    // Process the wit.ai response
    // Here we assume you want to use the first intent detected by wit.ai
    if (witData.entities && witData.entities.intent && witData.entities.intent.length > 0) {
      const intent = witData.entities.intent[0].value;
      if (intent === 'greeting') {
        reply = 'Hello! How can I help you today?';
      }
      // Add more conditions based on your intents
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
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
