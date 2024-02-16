const fetch = require('node-fetch'); // Ensure node-fetch is installed

exports.handler = async function(event, context) {
  // Check the HTTP method
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed'
    };
  }

  try {
    const requestBody = JSON.parse(event.body);
    const message = requestBody.message;
    const witToken = process.env.WIT_AI_TOKEN; // Set in Netlify environment variables

    const witResponse = await fetch(`https://api.wit.ai/message?v=20201005&q=${encodeURIComponent(message)}`, {
      headers: { 'Authorization': `Bearer ${witToken}` }
    });

    if (!witResponse.ok) {
      throw new Error(`HTTP error! status: ${witResponse.status}`);
    }

    const witData = await witResponse.json();

    // Process the wit.ai response and determine a reply
    let reply = 'I did not understand that.';
    // Example of processing witData to determine the reply...

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
