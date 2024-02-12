// chat.js
document.addEventListener('DOMContentLoaded', () => {
    const sendButton = document.getElementById('send-btn');
    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');

    // Function to send a message
    function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            fetch('/chatbot', {
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

    // Event listener for the send button click
    sendButton.addEventListener('click', sendMessage);

    // Event listener for the enter key press
    userInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });
});