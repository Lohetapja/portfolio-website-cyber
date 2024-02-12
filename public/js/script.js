// script.js

// Function to send a message
function sendMessage() {
    const message = userInput.value.trim();
    if (message) {
        fetch('/.netlify/functions/chatbot', { // Update this URL to match your Netlify function endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message }),
        })
        .then(response => response.json())
        .then(data => {
            const messageElement = document.createElement('div');
            messageElement.textContent = data.reply;
            chatMessages.appendChild(messageElement);
            chatMessages.scrollTop = chatMessages.scrollHeight;
            userInput.value = ''; // Clear the input after sending
        })
        .catch(error => console.error('Error:', error));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const sendButton = document.getElementById('send-btn');
    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');

    // Event listener for the send button click
    sendButton.addEventListener('click', sendMessage);

    // Event listener for the enter key press
    userInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    // Load projects (if applicable)
    // ...

    // Update the year in the footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Other DOMContentLoaded logic
    // ...
});
