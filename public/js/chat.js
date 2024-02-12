// chat.js
document.addEventListener('DOMContentLoaded', () => {
    const sendButton = document.getElementById('send-btn');
    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');

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

    sendButton.addEventListener('click', sendMessage);

    // Also trigger sendMessage when the user presses the Enter key
    userInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent the default form submit
            sendMessage();
        }
    });
});
