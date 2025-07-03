# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal website built with a React frontend and Flask backend API. The project structure consists of:
- **Frontend**: React application using React Router for navigation, built with Create React App
- **Backend**: Flask API with PostgreSQL database integration for contact form submissions
- **Deployment**: Frontend hosted on Vercel, backend configured for cloud deployment

## Development Commands

### Initial Setup
```bash
# Backend setup (run first)
cd api/
pip install -r requirements.txt    # Install Python dependencies
python app.py                      # Start Flask development server (http://127.0.0.1:5000)

# Frontend setup (in new terminal)
cd frontend/
npm install                        # Install Node.js dependencies  
npm start                          # Start development server (http://localhost:3000)
```

### Frontend (React)
Navigate to the `frontend/` directory for all frontend operations:

```bash
npm start          # Start development server (http://localhost:3000)
npm run build      # Build for production
npm test           # Run tests
npm run eject      # Eject from Create React App (irreversible)
```

### Backend (Flask)
Navigate to the `api/` directory for backend operations:

```bash
python app.py                      # Start Flask development server (http://127.0.0.1:5000)
pip install -r requirements.txt    # Install/update Python dependencies
```

**Database**: Uses PostgreSQL (requires database setup and environment variables).

## Architecture

### Frontend Structure
- **App.js**: Main application component with React Router setup
- **pages/**: Page components (Home, About, ContactForm)
- **components/**: Reusable components (NavBar, Footer, FetchMedia)
- **Routing**: Uses React Router DOM v7 with routes for `/`, `/about`, `/contact`

### Backend Structure
- **app.py**: Main Flask application with database connection and API endpoints
- **media.py**: Additional media handling (currently unused)
- **Database**: PostgreSQL with `contacts` table for form submissions
- **CORS**: Configured for Vercel frontend domain and localhost development

### API Endpoints
- `POST /contact`: Submit contact form data to PostgreSQL database
- Commented out S3 upload functionality (`/upload`, `/files`) for future use

### Key Technical Details
- Frontend uses functional components with React hooks
- Contact form submits to production API URL via environment variables
- Contact form includes loading states and success/error feedback
- Database connection uses psycopg2 with environment variable configuration
- NavBar component includes responsive mobile menu with toggle functionality

### Database Schema
The PostgreSQL `contacts` table with columns:
- `id` (SERIAL PRIMARY KEY)
- `name` (VARCHAR NOT NULL)
- `email` (VARCHAR NOT NULL) 
- `message` (TEXT NOT NULL)
- `created_at` (TIMESTAMP DEFAULT CURRENT_TIMESTAMP)

### Environment Variables (Backend)
Required for PostgreSQL connection:
- `DB_NAME`: PostgreSQL database name
- `DB_USER`: Database username
- `DB_PASSWORD`: Database password
- `DB_HOST`: Database host
- `DB_PORT`: Database port (default: 5432)

## Development Workflow

### Local Development
1. **Setup PostgreSQL database** and configure environment variables in `.env` file
2. **Start backend server**: `cd api && python app.py`
   - Backend API available at http://127.0.0.1:5000
3. **Start frontend development server**: `cd frontend && npm start` 
   - Frontend available at http://localhost:3000
   - Hot reload enabled for development

### Production Deployment
1. **Frontend (Vercel)**: https://miczhuan-website.vercel.app
   - Set environment variable: `REACT_APP_API_URL=https://miczhuan-website.onrender.com`
   - Deploy to Vercel
2. **Backend (Render)**: https://miczhuan-website.onrender.com
   - Deploy Flask app to Render
   - Configure PostgreSQL database (Render provides managed PostgreSQL)
   - Set database environment variables in Render dashboard
   - CORS configured for Vercel domain

## Important Files
- **Frontend**: `frontend/src/pages/ContactForm.js` - Contact form with validation and feedback
- **Backend**: `api/app.py` - Main Flask application with database operations
- **Environment**: `api/.env` - Database connection configuration (local development)
- **Config**: `frontend/package.json`, `api/requirements.txt` - Dependencies