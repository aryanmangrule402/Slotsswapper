# 🎯 SlotSwap

![License](https://img.shields.io/badge/License-MIT-blue)
![Frontend](https://img.shields.io/badge/Frontend-React-blue)
![Backend](https://img.shields.io/badge/Backend-Node.js-green)
![Database](https://img.shields.io/badge/Database-MongoDB-yellow)

---

## 🚀 Overview
**SlotSwap** is a modern web application that enables users to **swap event slots** with other users seamlessly. Perfect for managing schedules, shifting responsibilities, or sharing time slots efficiently.  

**Features:**
- User authentication (Signup/Login)
- Dashboard to manage personal events
- Mark events as `BUSY` or `SWAPPABLE`
- Marketplace to browse swappable slots from other users
- Swap requests management (incoming/outgoing)
- Dynamic state updates for seamless UX

---

## 🛠️ Tech Stack

| Layer       | Technology      |
|------------ |----------------|
| Frontend    | React.js, Axios, CSS |
| Backend     | Node.js, Express.js |
| Database    | MongoDB, Mongoose |
| Auth        | JWT (JSON Web Token) |

---

## 📁 Folder Structure

frontend/
├─ src/
│ ├─ api/axios.js
│ ├─ components/
│ │ ├─ Navbar.js
│ │ └─ ProtectedRoute.js
│ ├─ pages/
│ │ ├─ Dashboard.js
│ │ ├─ Marketplace.js
│ │ ├─ Requests.js
│ │ ├─ Login.js
│ │ └─ Signup.js
│ └─ index.js
backend/
├─ models/
│ ├─ Event.js
│ └─ SwapRequest.js
├─ routes/
│ ├─ auth.js
│ ├─ events.js
│ └─ swaps.js
├─ middleware/auth.js
└─ server.js

yaml
Copy code

---

## ⚙️ Setup Instructions

### Backend
```bash
# Clone the repo
git clone <your-repo-url>
cd backend

# Install dependencies
npm install

# Create .env file
# PORT=4000
# MONGO_URI=<your-mongo-uri>
# JWT_SECRET=<your-secret-key>

# Start server
npm run dev
Frontend
bash
Copy code
cd frontend

# Install dependencies
npm install

# Start development server
npm start
🔗 API Endpoints
Authentication
Method	Endpoint	Description
POST	/auth/signup	Register new user
POST	/auth/login	Login user
GET	/auth/me	Get logged-in user info

Events
Method	Endpoint	Description
POST	/events	Create new event
GET	/events	Get user’s events
PUT	/events/:id	Update event title/status
DELETE	/events/:id	Delete event

Swaps
Method	Endpoint	Description
GET	/swaps/swappable-slots	Get all other users’ swappable slots
POST	/swaps/request-swap	Request a swap
POST	/swaps/swap-response/:id	Respond to swap request
GET	/swaps/swap-requests	Get incoming & outgoing requests

🧩 User Workflow
Register & Login

Signup as a new user

Login to access dashboard

Dashboard

View all personal events

Add new events

Mark events as SWAPPABLE

Marketplace

Browse swappable slots of other users

Request swap by selecting one of your own SWAPPABLE slots

Requests

Incoming requests: Accept or reject swap offers

Outgoing requests: Track status (Pending/Accepted/Rejected)

Logout

End session and return to login page

📝 Assumptions & Notes
Only SWAPPABLE events can be offered for swaps

Users can make multiple slots swappable

JWT token stored in browser localStorage

Backend must run on http://localhost:4000 for frontend API calls

State updates dynamically; dashboard reflects changes immediately
