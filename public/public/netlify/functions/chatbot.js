import fetch from 'node-fetch'; // Use import instead of require

export async function handler(event, context) {
  // Only allow POST method
  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      body: 'Method Not Allowed',
      headers: { 'Allow': 'POST' }
    };
  }

  try {
    const { message } = JSON.parse(event.body);

    // Replace 'YOUR_WIT_AI_SERVER_ACCESS_TOKEN' with your actual wit.ai server access token
    const witResponse = await fetch(`https://api.wit.ai/message?v=20210105&q=${encodeURIComponent(message)}`, {
      headers: {
        'Authorization': `Bearer YOUR_WIT_AI_SERVER_ACCESS_TOKEN`
      }
    });

    if (!witResponse.ok) {
      throw new Error(`HTTP error! status: ${witResponse.status}`);
    }

    const witData = await witResponse.json();
    // Process the wit.ai response as needed. Here, we just return the first entity value
    const firstEntityValue = witData.entities && Object.values(witData.entities)[0][0].value;
    const reply = firstEntityValue || "I'm not sure how to respond to that.";

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
