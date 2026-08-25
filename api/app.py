import os
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables (only for local development)
if os.getenv("RENDER") is None:  # Render sets this automatically
    load_dotenv()
    print("Loading .env file for local development")
else:
    print("Running on Render - using platform environment variables")

app = Flask(__name__)
CORS(app, origins=["https://miczhuan-website.vercel.app", "http://localhost:3000", "https://miczhuan-website.onrender.com"])

RESEND_API_KEY = os.getenv("RESEND_API_KEY")
CONTACT_EMAIL = os.getenv("CONTACT_EMAIL", "mzhuang5@gmail.com")

@app.route("/debug-env", methods=["GET"])
def debug_env():
    """Debug endpoint to check environment variables"""
    return jsonify({
        "render": os.getenv("RENDER"),
        "resend_api_key_set": bool(RESEND_API_KEY),
        "contact_email": CONTACT_EMAIL
    })

@app.route("/", methods=["GET"])
def health_check():
    return jsonify({"status": "API is running", "message": "Flask backend is healthy"}), 200

# Route to email contact form submissions directly, via Resend
@app.route("/contact", methods=["POST"])
def submit_contact():
    data = request.get_json()

    if not data:
        return jsonify({"error": "Invalid JSON data"}), 400
    name = data.get("name")
    email = data.get("email")
    message = data.get("message")

    if not name or not email or not message:
        return jsonify({"error": "Missing required fields"}), 400

    if not RESEND_API_KEY:
        print("RESEND_API_KEY is not set")
        return jsonify({"error": "Email service is not configured"}), 500

    try:
        response = requests.post(
            "https://api.resend.com/emails",
            headers={
                "Authorization": f"Bearer {RESEND_API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "from": "Portfolio Contact Form <onboarding@resend.dev>",
                "to": [CONTACT_EMAIL],
                "reply_to": email,
                "subject": f"New message from {name}",
                "text": f"From: {name} <{email}>\n\n{message}"
            },
            timeout=10
        )

        if response.status_code >= 400:
            print(f"Resend error: {response.status_code} {response.text}")
            return jsonify({"error": "Failed to send message"}), 502

        return jsonify({"success": "Message received!"}), 200

    except requests.RequestException as e:
        print(f"Error sending email via Resend: {e}")
        return jsonify({"error": "Failed to send message"}), 502

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)
