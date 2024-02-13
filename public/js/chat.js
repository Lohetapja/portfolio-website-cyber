// chat.js - Client-side JavaScript for handling chat functionality
fetch('/.netlify/functions/chatbot', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message: message }),
})


document.addEventListener('DOMContentLoaded', () => {
    // Grab the elements from the page
    const sendButton = document.getElementById('send-btn'); // The button used to send messages
    const userInput = document.getElementById('user-input'); // The input field for user messages
    const chatMessages = document.getElementById('chat-messages'); // The container to display chat messages

    // Function to send a message to the server
    function sendMessage() {
        // Get the user's message and remove any leading/trailing whitespace
        const message = userInput.value.trim();

        // Only proceed if the message is not empty
        if (message) {
            // Send the message to the server using the Fetch API
            fetch('/.netlify/functions/chatbot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: message }),
            })
            .then(response => {
                // If the response is not ok, throw an error
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                // Parse the response as JSON
                return response.json();
            })
            .then(data => {
                // Create a new div element to hold the server's reply
                const messageElement = document.createElement('div');
                // Set the text of the div to the reply
                messageElement.textContent = data.reply;
                // Append the message to the chat messages container
                chatMessages.appendChild(messageElement);
                // Scroll the chat messages container to the bottom
                chatMessages.scrollTop = chatMessages.scrollHeight;
                // Clear the user input field
                userInput.value = '';
            })
            .catch(error => {
                // If there's an error, log it to the console and display it in the chat
                console.error('Error:', error);
                const messageElement = document.createElement('div');
                messageElement.textContent = `Error: ${error.message}`;
                chatMessages.appendChild(messageElement);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            });
        }
    }

    // Add an event listener to the send button for click events
    sendButton.addEventListener('click', sendMessage);

    // Add an event listener to the user input for keypress events
    userInput.addEventListener('keypress', (event) => {
        // If the Enter key is pressed, prevent the default form submission and send the message
        if (event.key === 'Enter') {
            event.preventDefault();
            sendMessage();
        }
    });
});
