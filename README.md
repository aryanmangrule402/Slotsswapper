# 🎯 SlotSwap - Event Slot Swapping Platform

---

## Overview
SlotSwap is a web application that allows users to **swap event slots** with other users seamlessly. Users can create their own events, mark slots as swappable, browse other users’ swappable slots, send swap requests, and manage incoming/outgoing requests.

**Key Features:**
- User registration & login
- Dashboard with personal events
- Mark events as BUSY or SWAPPABLE
- Marketplace for browsing other users’ swappable slots
- Swap requests management (accept/reject)
- Real-time updates on event swaps

---

## Tech Stack
- **Frontend:** React.js, Axios, React Router
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Authentication:** JWT
- **Styling:** CSS

---

## Setup Instructions

### 1️⃣ Backend Setup
```bash
# Clone the repository
git clone <your-repo-url>
cd backend

# Install dependencies
npm install

# Create a .env file with:
# PORT=4000
# MONGO_URI=<your-mongodb-connection-string>
# JWT_SECRET=<your-jwt-secret>

# Start backend server
npm run dev
Backend runs at: http://localhost:4000

2️⃣ Frontend Setup
bash
Copy code
cd frontend

# Install dependencies
npm install

# Start frontend
npm start
Frontend runs at: http://localhost:3000

Folder Structure
bash
Copy code
frontend/
├─ src/
│  ├─ api/axios.js          # Axios instance
│  ├─ components/
│  │  ├─ Navbar.js          # Navigation bar
│  │  └─ ProtectedRoute.js  # Authenticated route guard
│  ├─ pages/
│  │  ├─ Dashboard.js       # User events and calendar
│  │  ├─ Marketplace.js     # Browse and request swaps
│  │  ├─ Requests.js        # Incoming & outgoing swap requests
│  │  ├─ Login.js
│  │  └─ Signup.js
│  └─ index.js
backend/
├─ models/
│  ├─ Event.js
│  └─ SwapRequest.js
├─ routes/
│  ├─ auth.js
│  ├─ events.js
│  └─ swaps.js
├─ middleware/auth.js
├─ server.js
└─ .env
API Endpoints
Authentication
Method	Endpoint	Description	Body
POST	/auth/signup	Register new user	{ name, email, password }
POST	/auth/login	Login user	{ email, password }
GET	/auth/me	Get logged-in user info	Header: Authorization: Bearer <token>

Events
Method	Endpoint	Description	Body
POST	/events	Create new event	{ title, startTime, endTime }
GET	/events	Get user’s events	Header: Authorization
PUT	/events/:id	Update event title/status	{ title?, status? }
DELETE	/events/:id	Delete event	Header: Authorization

Swaps
Method	Endpoint	Description	Body
GET	/swaps/swappable-slots	Get all other users’ swappable slots	Header: Authorization
POST	/swaps/request-swap	Request a swap	{ mySlotId, theirSlotId }
POST	/swaps/swap-response/:id	Respond to swap request	{ accepted: true/false }
GET	/swaps/swap-requests	Get incoming & outgoing requests	Header: Authorization

User Workflow
Registration & Login

Sign up as a new user.

Login to access dashboard, marketplace, and requests.

Navbar shows logged-in user name and proper buttons (Login/Signup or Logout).

Dashboard

View personal events in calendar/list.

Create new events.

Change status to SWAPPABLE to make it available for swaps.

Marketplace

Browse swappable slots from other users.

Click "Request Swap" to select one of your own swappable slots.

Send swap requests.

Requests Page

View Incoming Requests with Accept/Reject options.

View Outgoing Requests showing status.

Accepting swaps exchanges ownership of slots and updates dashboard dynamically.

Logout

Click logout to remove token and redirect to login page.
