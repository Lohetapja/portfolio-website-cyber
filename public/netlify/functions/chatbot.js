// netlify/functions/chatbot.js

exports.handler = async function(event, context) {
  // Only allow POST method
  if (event.httpMethod !== 'POST') {
      return { 
          statusCode: 405, 
          body: 'Method Not Allowed',
          headers: { 'Allow': 'POST' } 
      };
  }

  try {
      // Parse the JSON body from the POST request
      const data = JSON.parse(event.body);
      const message = data.message;
      
      // Here you can implement your logic based on the message received
      // For example, let's send a simple echo reply
      const reply = `You said: ${message}`;

      // Return a successful response with the reply
      return {
          statusCode: 200,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ reply })
      };
  } catch (error) {
      // Handle any errors that occurred during processing
      return {
          statusCode: 500,
          body: JSON.stringify({ error: 'Internal Server Error' })
      };
  }
};
