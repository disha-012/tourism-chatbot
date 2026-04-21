// Data provided from the website
const websiteData = {
    destinations: ["Paris", "Tokyo", "New York", "Bali"],
    hotels: ["Grand Plaza", "Sunset Resort", "The Urban Stay"],
    packages: ["Honeymoon Special", "Family Adventure", "Solo Backpacker"],
    attractions: ["Eiffel Tower", "Mount Fuji", "Central Park", "Uluwatu Temple"],
    food: ["Croissants in France", "Sushi in Japan", "Street Tacos in Mexico"]
};
// Function for button clicks
async function sendOption(category) {
    const chatBox = document.getElementById("chat-box");
    
    // Display the user's "selection" as a message
    chatBox.innerHTML += `<div class="user-msg">I want to see ${category}</div>`;
    
    // Send the category name to Flask
    fetchResponse(category);
}

// Function for typed text
async function sendMessage() {
    const inputField = document.getElementById("user-input");
    const message = inputField.value.trim();
    if (!message) return;

    const chatBox = document.getElementById("chat-box");
    chatBox.innerHTML += `<div class="user-msg">${message}</div>`;
    inputField.value = "";

    fetchResponse(message);
}

// The core logic that talks to your Python Backend
async function fetchResponse(text) {
    const chatBox = document.getElementById("chat-box");

    // 1. Create and show the typing indicator
    const typingDiv = document.createElement("div");
    typingDiv.className = "typing";
    typingDiv.id = "typing-indicator";
    typingDiv.innerHTML = "<span></span><span></span><span></span>";
    chatBox.appendChild(typingDiv);
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        // 2. Add a slight artificial delay (600ms) for a more "human" feel
        await new Promise(resolve => setTimeout(resolve, 600));

        const response = await fetch('/ask', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: text })
        });


        const data = await response.json();

        // 3. Remove the typing indicator before showing the answer
        document.getElementById("typing-indicator").remove();

        chatBox.innerHTML += `<div class="bot-msg">${data.reply}</div>`;
    } catch (error) {
        document.getElementById("typing-indicator").remove();
        chatBox.innerHTML += `<div class="bot-msg">Connection error.</div>`;
    }
    
    chatBox.scrollTop = chatBox.scrollHeight;
}

