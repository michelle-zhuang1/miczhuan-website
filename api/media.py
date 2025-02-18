import boto3
from botocore.exceptions import NoCredentialsError
from flask import Flask, jsonify

app = Flask(__name__)

# Create an S3 client
s3_client = boto3.client('s3')

@app.route('/get-image-url/<filename>')
def get_image_url(filename):
    try:
        # Generate a signed URL for the private image
        bucket_name = 'miczhuan-website'
        signed_url = s3_client.generate_presigned_url('get_object',
                                                     Params={'Bucket': bucket_name, 'Key': filename},
                                                     ExpiresIn=3600)  # 1 hour expiration
        return jsonify({'url': signed_url})
    except NoCredentialsError:
        return jsonify({'error': 'Credentials not available'}), 403

if __name__ == '__main__':
    app.run(debug=True)