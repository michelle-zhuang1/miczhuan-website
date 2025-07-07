# Personal Website - React & Flask

A modern personal website built with React frontend and Flask backend API.

## Project Overview

This project transforms a static HTML personal website into a dynamic full-stack application using:
- **Frontend**: React with React Router for navigation
- **Backend**: Flask API with PostgreSQL database
- **Features**: Contact form with database storage, responsive design

## Features

- **Home Page**: Personal introduction and overview
- **About Page**: Detailed background information
- **Contact Form**: Functional contact form with:
  - Form validation
  - Loading states during submission
  - Success/error feedback messages
  - Data stored in PostgreSQL database
- **Responsive Design**: Mobile-friendly navigation
- **Social Links**: GitHub, LinkedIn, and email links

## Technology Stack

### Frontend
- React 19.0.0
- React Router DOM 7.1.5
- Create React App
- CSS3 with responsive design

### Backend
- Flask (Python web framework)
- PostgreSQL database with psycopg2
- Flask-CORS for cross-origin requests
- Python-dotenv for environment management

## Database

The application uses PostgreSQL with a `contacts` table:
- `id`: Primary key (SERIAL)
- `name`: Contact name (VARCHAR)
- `email`: Contact email (VARCHAR)
- `message`: Contact message (TEXT)
- `created_at`: Timestamp (DEFAULT CURRENT_TIMESTAMP)

### Database Schema Creation
```sql
CREATE TABLE contacts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Deployment

### Production URLs
- **Frontend**: https://miczhuan-website.vercel.app
- **Backend API**: https://miczhuan-website.onrender.com

