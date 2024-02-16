// chat.js - Client-side JavaScript for handling chat functionality

// Ensure DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Get the necessary DOM elements
    const sendButton = document.getElementById('send-btn');
    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');
  
    // Function to send a message to the server
    function sendMessage() {
      const message = userInput.value.trim(); // Get the user's message
  
      if (message) {
        // Send the message to the Netlify function
        fetch('/lumina', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message })
        })
        .then(response => {
          if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
          return response.json();
        })
        .then(data => {
          // Display the server's response
          const messageElement = document.createElement('div');
          messageElement.textContent = data.reply;
          chatMessages.appendChild(messageElement);
          chatMessages.scrollTop = chatMessages.scrollHeight;
          userInput.value = ''; // Clear the input field
        })
        .catch(error => {
          console.error('Error:', error);
          const messageElement = document.createElement('div');
          messageElement.textContent = `Error: ${error.message}`;
          chatMessages.appendChild(messageElement);
          chatMessages.scrollTop = chatMessages.scrollHeight;
        });
      }
    }
  
    // Event listeners for send button and enter key press
    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', event => {
      if (event.key === 'Enter') {
        event.preventDefault();
        sendMessage();
      }
    });
  });
  