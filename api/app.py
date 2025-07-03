import os
# import boto3
from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app, origins=["https://miczhuan-website.vercel.app", "http://localhost:3000", "https://miczhuan-website.onrender.com"])

@app.route("/", methods=["GET"])
def health_check():
    return jsonify({"status": "API is running", "message": "Flask backend is healthy"}), 200

@app.route("/contacts", methods=["GET"])
def get_contacts():
    """Debug endpoint to view all contacts"""
    try:
        conn, cursor = get_db_connection()
        if not conn:
            return jsonify({"error": "Database connection failed"}), 500
            
        cursor.execute("SELECT id, name, email, message, created_at FROM contacts ORDER BY created_at DESC")
        contacts = cursor.fetchall()
        
        result = []
        for contact in contacts:
            result.append({
                "id": contact[0],
                "name": contact[1], 
                "email": contact[2],
                "message": contact[3],
                "created_at": contact[4]
            })
        
        cursor.close()
        conn.close()
        
        return jsonify({
            "contacts": result,
            "count": len(result)
        }), 200
        
    except Exception as e:
        print(f"Error getting contacts: {e}")
        return jsonify({"error": str(e)}), 500

def get_db_connection():
    try:
        conn = psycopg2.connect(
            dbname=os.getenv("DB_NAME"),
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD"),
            host=os.getenv("DB_HOST"),
            port=os.getenv("DB_PORT", 5432))
        cursor = conn.cursor()
        
        # Create table if it doesn't exist
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS contacts (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                message TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        conn.commit()
        
        # Check if table was created and count existing records
        cursor.execute("SELECT COUNT(*) FROM contacts")
        count = cursor.fetchone()[0]
        print(f"Connected to PostgreSQL database! Current record count: {count}")
        return conn, cursor
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
        if not conn or not cursor:
            print("Failed to get database connection")
            return jsonify({"error": "Database connection failed"}), 500
            
        print(f"Inserting contact: name={name}, email={email}, message={message[:50]}...")
        cursor.execute("INSERT INTO contacts (name, email, message) VALUES (%s, %s, %s)", (name, email, message))
        
        # Verify the insert worked (PostgreSQL way)
        cursor.execute("SELECT LASTVAL()")
        row_id = cursor.fetchone()[0]
        print(f"Inserted record with ID: {row_id}")
        
        conn.commit()
        
        # Double-check the record was saved
        cursor.execute("SELECT COUNT(*) FROM contacts")
        total_count = cursor.fetchone()[0]
        print(f"Total records after insert: {total_count}")
        
        cursor.close()
        conn.close()
        return jsonify({"success": "Message received!", "record_id": row_id}), 200
    
    except Exception as e:
        print(f"Error inserting contact form data: {e}")
        import traceback
        traceback.print_exc()
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
    import os
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)
