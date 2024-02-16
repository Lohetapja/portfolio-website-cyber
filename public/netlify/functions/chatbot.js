const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const requestBody = JSON.parse(event.body);
    const message = requestBody.message;
    const witToken = process.env.WIT_AI_TOKEN;

    const witResponse = await fetch(`https://api.wit.ai/message?v=20201005&q=${encodeURIComponent(message)}`, {
      headers: { 'Authorization': `Bearer ${witToken}` }
    });

    if (!witResponse.ok) {
      let errorDetail = 'Unknown error occurred.';
      if (witResponse.status === 401) {
        errorDetail = 'Authentication failed.';
      } else if (witResponse.status === 500) {
        errorDetail = 'Server error on Wit.ai.';
      }
      throw new Error(`HTTP error! status: ${witResponse.status}. ${errorDetail}`);
    }

    const witData = await witResponse.json();

    // Process witData and determine a reply
    let reply = 'I did not understand that.';
    // Custom logic to process witData...

    return { statusCode: 200, body: JSON.stringify({ reply }) };
  } catch (error) {
    console.error('Error:', error);
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
