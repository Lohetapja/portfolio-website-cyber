// chat.js - Client-side JavaScript for handling chat functionality

document.addEventListener('DOMContentLoaded', () => {
    const sendButton = document.getElementById('send-btn');
    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');
  
    // Function to send a message to the server
    function sendMessage() {
      const message = userInput.value.trim(); // Get the user's message and remove any leading/trailing whitespace
  
      if (message) { // Only proceed if the message is not empty
        fetch('/.netlify/functions/chatbot', { // Send the message to the Netlify function
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: message }),
        })
        .then(response => {
          if (!response.ok) { // If the response is not ok, throw an error
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json(); // Parse the response as JSON
        })
        .then(data => {
          const messageElement = document.createElement('div'); // Create a new div element to hold the server's reply
          messageElement.textContent = data.reply; // Set the text of the div to the reply
          chatMessages.appendChild(messageElement); // Append the message to the chat messages container
          chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to the bottom
          userInput.value = ''; // Clear the user input field
        })
        .catch(error => {
          console.error('Error:', error); // Log any errors to the console
          const messageElement = document.createElement('div');
          messageElement.textContent = `Error: ${error.message}`;
          chatMessages.appendChild(messageElement);
          chatMessages.scrollTop = chatMessages.scrollHeight;
        });
      }
    }
  
    sendButton.addEventListener('click', sendMessage); // Add event listener for the send button click
  
    userInput.addEventListener('keypress', (event) => { // Add event listener for the user input keypress events
      if (event.key === 'Enter') { // If the Enter key is pressed
        event.preventDefault();
        sendMessage();
      }
    });
  });
  