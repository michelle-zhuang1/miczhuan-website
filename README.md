# Personal Website - React & Flask

A modern personal website built with React frontend and Flask backend API.

## Project Overview

This project transforms a static HTML personal website into a dynamic full-stack application using:
- **Frontend**: React with React Router for navigation
- **Backend**: Flask API with PostgreSQL database
- **Features**: Contact form with database storage, responsive design

## Quick Start

### Prerequisites
- Node.js and npm (for React frontend)
- Python 3.x (for Flask backend)
- PostgreSQL database

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd miczhuan-website
   ```

2. **Database Setup**
   - Install PostgreSQL locally or use a cloud provider
   - Create a database for the application
   - Create a `.env` file in the `api/` directory with:
     ```
     DB_NAME=your_database_name
     DB_USER=your_username
     DB_PASSWORD=your_password
     DB_HOST=localhost
     DB_PORT=5432
     ```

3. **Backend Setup**
   ```bash
   cd api
   pip install -r requirements.txt
   python app.py
   ```
   Backend will run on http://127.0.0.1:5000

4. **Frontend Setup** (in a new terminal)
   ```bash
   cd frontend
   npm install
   npm start
   ```
   Frontend will run on http://localhost:3000

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

### Production Setup
1. **Frontend (Vercel)**:
   - Environment variable: `REACT_APP_API_URL=https://miczhuan-website.onrender.com`
   - Auto-deploys from main branch
   
2. **Backend (Render)**:
   - Deploy with `gunicorn app:app`
   - Configure PostgreSQL database (Render provides managed PostgreSQL)
   - Set environment variables for database connection
   
### Environment Variables

**Frontend**:
- `REACT_APP_API_URL=https://miczhuan-website.onrender.com` (production)
- For local development: Create `.env.local` with `REACT_APP_API_URL=http://127.0.0.1:5000`

**Backend** (required for PostgreSQL):
- `DB_NAME`: Database name
- `DB_USER`: Database username  
- `DB_PASSWORD`: Database password
- `DB_HOST`: Database host
- `DB_PORT`: Database port (default: 5432)

## Development Notes

- Contact form includes comprehensive error handling
- CORS configured for both production and development
- PostgreSQL provides persistent, reliable data storage
- Mobile-responsive navigation with hamburger menu
- Environment variables required for database connectivity
