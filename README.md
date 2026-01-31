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