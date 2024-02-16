const fetch = require('node-fetch'); // Ensure node-fetch is installed

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed. Only POST requests are accepted.' })
    };
  }

  try {
    if (!event.body) {
      throw new Error('Missing request body');
    }
    const requestBody = JSON.parse(event.body);
    if (!requestBody.message) {
      throw new Error('Missing message in request body');
    }
    const message = requestBody.message;
    if (!process.env.WIT_AI_TOKEN) {
      throw new Error('Missing WIT_AI_TOKEN in environment variables');
    }
    const witToken = process.env.WIT_AI_TOKEN;

    const witResponse = await fetch(`https://api.wit.ai/message?v=20201005&q=${encodeURIComponent(message)}`, {
      headers: { 'Authorization': `Bearer ${witToken}` }
    });

    if (!witResponse.ok) {
      throw new Error(`Wit.ai HTTP error! status: ${witResponse.status}`);
    }

    const witData = await witResponse.json();
    if (!witData) {
      throw new Error('No response from Wit.ai');
    }

    let reply = 'I am not sure how to respond to that.';
    // Here you would process witData to determine the reply...
    // For example:
    // if (witData.entities.intent) {
    //   const intent = witData.entities.intent[0].value;
    //   reply = determineReply(intent);
    // }

    return {
      statusCode: 200,
      body: JSON.stringify({ reply })
    };
  } catch (error) {
    console.error('Error:', error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};

// This is a placeholder function. Replace it with your actual reply logic.
function determineReply(intent) {
  switch (intent) {
    case 'greeting':
      return 'Hello! How can I help you today?';
    // Add other intents and responses here...
    default:
      return 'I am not sure how to respond to that.';
  }
}
