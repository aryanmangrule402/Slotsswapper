# 🎯 SlotSwap

![License](https://img.shields.io/badge/License-MIT-blue)
![Frontend](https://img.shields.io/badge/Frontend-React-blue)
![Backend](https://img.shields.io/badge/Backend-Node.js-green)
![Database](https://img.shields.io/badge/Database-MongoDB-yellow)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen)

---

## 🔥 Project Overview

**SlotSwap** is a web application that allows users to **swap their event slots** with other users.  
This is ideal for scheduling flexibility, shifting responsibilities, and sharing availability efficiently.

**Key Features:**
- User authentication (Signup/Login)
- Dashboard to manage personal events
- Mark events as `BUSY` or `SWAPPABLE`
- Marketplace to view swappable slots from other users
- Send and respond to swap requests
- Dynamic state updates; dashboard reflects swaps immediately

---

## 🛠️ Tech Stack

| Layer       | Technology           |
|------------ |--------------------|
| Frontend    | React.js, Axios, CSS |
| Backend     | Node.js, Express.js |
| Database    | MongoDB, Mongoose   |
| Authentication | JWT (JSON Web Token) |

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
# Clone the repository
git clone <your-repo-url>
cd backend

# Install dependencies
npm install

# Create a .env file with:
# PORT=4000
# MONGO_URI=<your-mongodb-uri>
# JWT_SECRET=<your-secret-key>

# Start backend server
npm run dev
Frontend
bash
Copy code
cd frontend

# Install dependencies
npm install

# Start frontend server
npm start
Note: Frontend expects the backend API to run at http://localhost:4000

🔗 API Endpoints
Authentication
Method	Endpoint	Description
POST	/auth/signup	Register new user
POST	/auth/login	Login user
GET	/auth/me	Get logged-in user info

Events
Method	Endpoint	Description
POST	/events	Create a new event
GET	/events	Get all user events
PUT	/events/:id	Update event title/status
DELETE	/events/:id	Delete an event

Swaps
Method	Endpoint	Description
GET	/swaps/swappable-slots	Get all other users’ swappable slots
POST	/swaps/request-swap	Request a swap
POST	/swaps/swap-response/:id	Respond to swap request
GET	/swaps/swap-requests	Get incoming & outgoing requests

🧩 User Workflow
Register & Login

Signup as a new user.

Login to access the dashboard.

Dashboard

View all personal events.

Create new events.

Update event status (BUSY or SWAPPABLE).

Marketplace

Browse swappable slots of other users.

Request swap by selecting one of your own SWAPPABLE slots.

Requests

Incoming requests: Accept or reject swap offers.

Outgoing requests: Track status (Pending/Accepted/Rejected).

Logout

End session and return to login page.

💡 Assumptions & Notes
Only SWAPPABLE events can be offered for swaps.

Users can make multiple slots swappable.

JWT token is stored in browser localStorage.

Backend must run on http://localhost:4000 for API calls.

UI updates dynamically without page reloads.
