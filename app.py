from flask import Flask, render_template, request, jsonify
from openai import OpenAI

app = Flask(__name__)

# Initialize the OpenAI client
client = OpenAI(api_key="API KEY HERE")  # Replace with your actual API key

@app.route("/")
def home():
    """Render the homepage with the chatbot interface."""
    return render_template("index.html")

@app.route("/get_response", methods=["POST"])
def get_response():
    """Handle user input and return AI-generated responses."""
    user_message = request.json.get("message")  # Get the user input from the frontend
    if not user_message:
        return jsonify({"error": "No message provided"}), 400

    # Initialize message history for conversation (or retrieve it from context if needed)
    messages = [
        {"role": "system", "content": "You are a compassionate mental health assistant and will only respond to mental health related querires."},
        {"role": "user", "content": user_message}
    ]

    try:
        # Call the OpenAI API
        response = client.chat.completions.create(
            model="gpt-4o-mini",  # Replace with your actual model name
            messages=messages,
        )
        # Extract and return the assistant's reply
        assistant_reply = response.choices[0].message.content
        return jsonify({"reply": assistant_reply})
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "An error occurred while processing your request."}), 500

if __name__ == "__main__":
    app.run(debug=True)
