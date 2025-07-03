#!/usr/bin/env python3
"""
Test script to verify Flask server is working correctly.
Run this before testing the contact form.
"""

import requests
import json

def test_flask_server():
    """Test if Flask server is running and responding"""
    try:
        # Test server is responding
        response = requests.get("http://127.0.0.1:5000/")
        print(f"Server ping failed with status: {response.status_code}")
    except requests.exceptions.ConnectionError:
        print("❌ Flask server is not running!")
        print("   Start the server with: python app.py")
        return False
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        return False
    
    # Test contact endpoint
    try:
        test_data = {
            "name": "Test User",
            "email": "test@example.com", 
            "message": "This is a test message"
        }
        
        response = requests.post(
            "http://127.0.0.1:5000/contact",
            json=test_data,
            headers={"Content-Type": "application/json"}
        )
        
        if response.status_code == 200:
            result = response.json()
            if result.get("success"):
                print("✅ Contact form endpoint working correctly!")
                print(f"   Response: {result}")
                return True
            else:
                print(f"❌ Contact form returned error: {result}")
                return False
        else:
            print(f"❌ Contact form failed with status: {response.status_code}")
            print(f"   Response: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Contact form test failed: {e}")
        return False

if __name__ == "__main__":
    print("Testing Flask server...")
    if test_flask_server():
        print("\n🎉 Server is working correctly!")
        print("You can now test the contact form in your browser.")
    else:
        print("\n❌ Server test failed. Check the issues above.")