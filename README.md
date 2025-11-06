# 🎯 SlotSwap - Event Slot Swapping Platform

## Overview
SlotSwap is a web application that allows users to **swap event slots** with other users seamlessly. Users can create their own events, mark slots as swappable, browse other users’ swappable slots, send swap requests, and manage incoming/outgoing requests. The platform ensures proper **authorization** and dynamic updates to the user's calendar after swap actions.  

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

## Project Setup

### Backend
1. Clone the repository and navigate to the backend folder:
   ```bash
   git clone <repo-url>
   cd backend
Install dependencies:

bash
Copy code
npm install
Create a .env file:

env
Copy code
PORT=4000
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
Start the server:

bash
Copy code
npm run dev
Backend server runs at: http://localhost:4000

Frontend
Navigate to the frontend folder:

bash
Copy code
cd frontend
Install dependencies:

bash
Copy code
npm install
Start the React app:

bash
Copy code
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
POST	/auth/signup	Register a new user	{ name, email, password }
POST	/auth/login	Login user	{ email, password }
GET	/auth/me	Get logged-in user info	Header: Authorization: Bearer <token>

Events
Method	Endpoint	Description	Body
POST	/events	Create new event	{ title, startTime, endTime }
GET	/events	Get all events of logged-in user	Header: Authorization
PUT	/events/:id	Update event title/status	{ title?, status? }
DELETE	/events/:id	Delete event	Header: Authorization

Swaps
Method	Endpoint	Description	Body
GET	/swaps/swappable-slots	Get all other users’ swappable slots	Header: Authorization
POST	/swaps/request-swap	Request a swap	{ mySlotId, theirSlotId }
POST	/swaps/swap-response/:id	Respond to a swap request	{ accepted: true/false }
GET	/swaps/swap-requests	Get incoming & outgoing requests	Header: Authorization

User Workflow
Registration & Login

New users sign up and log in.

Users see a personalized navbar and their name displayed.

Dashboard

View personal events in a calendar/list.

Create new events with title, startTime, endTime.

Change event status to SWAPPABLE to make it available for swap.

Marketplace

Browse swappable slots from other users.

Click “Request Swap” to select one of your own swappable slots.

Send the swap request to the target user.

Requests Page

View Incoming Requests from other users with accept/reject buttons.

View Outgoing Requests with status (Pending/Accepted/Rejected).

Accepting a swap exchanges the ownership of slots.

State Management

All changes reflect dynamically in the dashboard and marketplace.

Protected routes prevent unauthorized access.

Assumptions & Notes
A slot can only be swapped when its status is SWAPPABLE.

Users can make multiple slots swappable at once.

JWT is used for authentication; token stored in localStorage.

Backend must be running at http://localhost:4000 for frontend requests to work.

