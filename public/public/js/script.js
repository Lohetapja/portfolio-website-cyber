// script.js - Client-side JavaScript for chat functionality

// Declare variables in the global scope to be accessed in multiple functions
let userInput, chatMessages, sendButton;

// Function to send a message to the server
function sendMessage() {
    const message = userInput.value.trim();
    if (message) {
        fetch('//.netlify/functions/chatbot', { // Ensure this URL matches your server endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const messageElement = document.createElement('div');
            messageElement.textContent = data.reply;
            chatMessages.appendChild(messageElement);
            chatMessages.scrollTop = chatMessages.scrollHeight;
            userInput.value = ''; // Clear the input after sending
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

// Set up the event listeners once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the variables with the corresponding elements from the DOM
    userInput = document.getElementById('user-input');
    chatMessages = document.getElementById('chat-messages');
    sendButton = document.getElementById('send-btn');

    // Add event listener for the send button click
    sendButton.addEventListener('click', sendMessage);

    // Add event listener for the enter key press in the input field
    userInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent the default form action
            sendMessage();
        }
    });

    // Update the year in the footer
    const yearSpan = document.getElementById('year');
    yearSpan.textContent = new Date().getFullYear();

    // Implement smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // ... any other initialization code ...
});
