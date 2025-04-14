import os
# import boto3
from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app, origins=["https://miczhuan-website.vercel.app"])

def get_db_connection():
    try:
        conn = psycopg2.connect(
            dbname=os.getenv("DB_NAME"),
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASS"),
            host=os.getenv("DB_HOST"),
            port=os.getenv("DB_PORT", 5432))
        print("Connected to database!")
        return conn, conn.cursor()
    except Exception as e:
        print(f"Error connecting to database: {e}")
        return None, None

# Route to insert contact form data into PostgreSQL
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
    
    try:
        conn, cursor = get_db_connection()
        cursor.execute("INSERT INTO contacts (name, email, message) VALUES (%s, %s, %s)", (name, email, message))

        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"success": "Message received!"}), 200
    
    except Exception as e:
        print(f"Error inserting contact form data: {e}")
        return jsonify({"error": str(e)}), 500
"""
Currently not in use

# Create an S3 client
S3_BUCKET = os.getenv("AWS_S3_BUCKET")
S3_REGION = os.getenv("AWS_REGION")
s3 = boto3.client(
    "s3",
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
)
print(f"Connected to S3 bucket: {S3_BUCKET}")

# Route to upload files via HTTP request
@app.route("/upload", methods=["POST"])
def upload_file():
    conn, cursor = get_db_connection()

    if "file" not in request.files:
        print(f"Error getting request file")
        return jsonify({"error": "No file part"}), 400

    file = request.files["file"]
    filename = file.filename

    # Upload file to S3
    s3.upload_fileobj(file, S3_BUCKET, filename, ExtraArgs={"ACL": "public-read"})

    # Generate public URL
    file_url = f"https://{S3_BUCKET}.s3.{S3_REGION}.amazonaws.com/{filename}" # URL Format Follows: https://<bucket-name>.s3.<region>.amazonaws.com/<filename>


    # Save file metadata to PostgreSQL
    cursor.execute("INSERT INTO images (filename, file_url) VALUES (%s, %s) RETURNING id", (filename, file_url))
    conn.commit()
    
    return jsonify({"id": cursor.fetchone()[0], "filename": filename, "file_url": file_url})

# Route to fetch all uploaded files
@app.route("/files", methods=["GET"])
def get_files():
    conn, cursor = get_db_connection()
    cursor.execute("SELECT id, filename, file_url FROM images")
    files = cursor.fetchall()
    return jsonify([{"id": row[0], "filename": row[1], "file_url": row[2]} for row in files]) 
"""

if __name__ == "__main__":
    app.run(debug=True)
