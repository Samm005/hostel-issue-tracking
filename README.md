# Hostel Issue Tracking System

A full-stack web application for students to report hostel issues and for management to track and resolve them.

## Tech Stack
- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB

## Features
- Student issue reporting
- Lost & Found module
- Announcements
- Issue tracking and status updates
## Project Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (Local or Atlas)
- Git

### Backend Setup

cd backend
npm install
node server.js

Create a `.env` file inside the `backend` folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

### Frontend Setup

cd frontend
npm install
npm run dev

## 🔗 API Endpoints (Sample)

- `POST /api/issues` – Create a new issue
- `GET /api/issues` – Fetch all issues
- `PUT /api/issues/:id` – Update issue status
- `GET /api/announcements` – Fetch announcements
- `POST /api/lost-found` – Report lost or found items
