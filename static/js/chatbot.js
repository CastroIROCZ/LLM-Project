document.getElementById("send-button").addEventListener("click", () => {
    const userInput = document.getElementById("user-input").value.trim();
    if (!userInput) return;

    const chatBox = document.getElementById("chat-box");

    // Append the user's message
    const userMessageDiv = document.createElement("div");
    userMessageDiv.className = "user-message";
    userMessageDiv.innerHTML = `<strong>You:</strong> ${userInput}`;
    chatBox.appendChild(userMessageDiv);

    // Clear the input field
    document.getElementById("user-input").value = "";

    // Send the user's input to the server
    fetch("/get_response", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: userInput })
    })
    .then(response => response.json())
    .then(data => {
        // Append the bot's response
        const botMessageDiv = document.createElement("div");
        botMessageDiv.className = "bot-message";
        botMessageDiv.innerHTML = `<strong>CalmMind:</strong> ${data.reply || "Sorry, I didn't catch that."}`;
        chatBox.appendChild(botMessageDiv);

        // Auto-scroll to the bottom of the chatbox
        chatBox.scrollTop = chatBox.scrollHeight;
    })
    .catch(error => {
        console.error("Error:", error);

        // Display an error message
        const errorMessageDiv = document.createElement("div");
        errorMessageDiv.className = "error-message";
        errorMessageDiv.innerHTML = `<strong>CalmMind:</strong> Sorry, something went wrong. Please try again later.`;
        chatBox.appendChild(errorMessageDiv);
    });
});
