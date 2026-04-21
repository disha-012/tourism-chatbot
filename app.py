from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# This is your "Website Data"
website_data = {
    "destinations": ["Paris", "Tokyo", "New York", "Bali"],
    "hotels": ["Grand Plaza", "Sunset Resort", "The Urban Stay"],
    "packages": ["Honeymoon Special", "Family Adventure", "Solo Backpacker"],
    "attractions": ["Eiffel Tower", "Mount Fuji", "Central Park", "Uluwatu Temple"],
    "food": ["Croissants in France", "Sushi in Japan", "Street Tacos in Mexico"]
}

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/ask', methods=['POST'])
def ask():
    user_message = request.json.get("message", "").lower()
    
    # Logic to search the website data
    if "destination" in user_message:
        response = f"Our destinations include: {', '.join(website_data['destinations'])}."
    elif "hotel" in user_message:
        response = f"You can stay at: {', '.join(website_data['hotels'])}."
    elif "package" in user_message:
        response = f"Check out our packages: {', '.join(website_data['packages'])}."
    elif "food" in user_message or "culture" in user_message:
        response = f"Try these local foods: {', '.join(website_data['food'])}."
    else:
        response = "Sorry, I couldn't find that information on our website."

    return jsonify({"reply": response})

if __name__ == '__main__':
    app.run(debug=True)