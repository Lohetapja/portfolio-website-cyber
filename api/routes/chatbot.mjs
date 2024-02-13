// api/routes/chatbot.mjs
import fetch from 'node-fetch';

// We will make this an Express middleware function
async function chatbotHandler(req, res, next) {
  const witToken = process.env.WIT_AI_TOKEN;
  // In Express, the body is already parsed, no need to parse it from a string
  const message = req.body.message;

  try {
    const witResponse = await fetch(`https://api.wit.ai/message?v=20201005&q=${encodeURIComponent(message)}`, {
      headers: { 'Authorization': `Bearer ${witToken}` }
    });

    if (!witResponse.ok) {
      // Express can handle errors with next(), passing the error to the error handling middleware
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

    // Respond with the JSON reply
    res.status(200).json({ reply });
  } catch (error) {
    // Log the error and pass it to the error-handling middleware
    console.error('Error:', error);
    next(error); // Pass the error to the next middleware (error handling)
  }
}

// We use named export for Express middleware
export { chatbotHandler };
