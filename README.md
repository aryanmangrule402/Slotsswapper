# 🎯 SlotSwap

![Frontend](https://img.shields.io/badge/Frontend-React-blue)
![Backend](https://img.shields.io/badge/Backend-Node.js-green)
![Database](https://img.shields.io/badge/Database-MongoDB-yellow)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen)

---

## 🔥 Project Overview

**SlotSwap** is a seamless web application crafted to empower users in **swapping their event slots** with one another—streamlining schedule changes, task shifting, and availability sharing in an intuitive way.

### 🌟 **Key Features**
- **🔐 User Authentication**: Secure signup/login for personalized access.
- **📊 Interactive Dashboard**: Effortlessly manage personal events and statuses.
- **⚡ Mark Events**: Tag events as `BUSY` or `SWAPPABLE`, keeping your schedule dynamic.
- **🏪 Marketplace**: Explore a public pool of swappable events and connect with other users.
- **🔁 Request & Respond**: Initiate swap requests, and accept or reject incoming offers—all tracked in one place.
- **🚀 Real-Time Updates**: Your dashboard instantly reflects the results of swaps for a smooth user experience.

---

## 🛠️ Tech Stack

| Layer         | Technology                |
| ------------- | ------------------------ |
| **Frontend**  | React.js, Axios, CSS     |
| **Backend**   | Node.js, Express.js      |
| **Database**  | MongoDB, Mongoose        |
| **Auth**      | JWT (JSON Web Token)     |

---

## 📁 Folder Structure

```
frontend/
├── src/
│   ├── api/axios.js
│   ├── components/
│   │   ├── Navbar.js
│   │   └── ProtectedRoute.js
│   ├── pages/
│   │   ├── Dashboard.js
│   │   ├── Marketplace.js
│   │   ├── Requests.js
│   │   ├── Login.js
│   │   └── Signup.js
│   └── index.js
backend/
├── models/
│   ├── Event.js
│   └── SwapRequest.js
├── routes/
│   ├── auth.js
│   ├── events.js
│   └── swaps.js
├── middleware/auth.js
└── server.js
```

---

## ⚙️ Getting Started

### 1️⃣ Backend Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd backend

# Install dependencies
npm install

# Configure environment variables
echo "PORT=4000" > .env
echo "MONGO_URI=<your-mongodb-uri>" >> .env
echo "JWT_SECRET=<your-secret-key>" >> .env

# Start backend server
npm run dev
```

### 2️⃣ Frontend Setup

```bash
cd frontend

# Install frontend dependencies
npm install

# Start frontend development server
npm start
```
> **Note:** Frontend is configured to interact with the backend at [http://localhost:4000](http://localhost:4000)

---

## 🔗 API Endpoints

### 🛡️ Authentication
| Method | Endpoint        | Description             |
|--------|----------------|------------------------|
| POST   | `/auth/signup` | Register new user      |
| POST   | `/auth/login`  | Login user             |
| GET    | `/auth/me`     | Get logged-in user info|

### 📅 Events
| Method | Endpoint         | Description                    |
|--------|------------------|-------------------------------|
| POST   | `/events`        | Create a new event            |
| GET    | `/events`        | Get all user events           |
| PUT    | `/events/:id`    | Update event title/status     |
| DELETE | `/events/:id`    | Delete an event               |

### 🔄 Swaps
| Method | Endpoint                         | Description                        |
|--------|----------------------------------|------------------------------------|
| GET    | `/swaps/swappable-slots`         | Get all other users’ swappable slots|
| POST   | `/swaps/request-swap`            | Request a swap                     |
| POST   | `/swaps/swap-response/:id`       | Respond to swap request            |
| GET    | `/swaps/swap-requests`           | Get incoming & outgoing requests   |

---

## 🧩 User Workflow

1. **Register & Login**
   - Create a new account and log in to access personal dashboard.

2. **Dashboard**
   - View, create, or update your events.
   - Set event status as BUSY or SWAPPABLE.

3. **Marketplace**
   - Browse others’ swappable slots.
   - Initiate swap requests by linking your SWAPPABLE slots.

4. **Requests**
   - **Incoming:** Accept or reject swap offers.
   - **Outgoing:** Track status (Pending/Accepted/Rejected).

5. **Logout**
   - Securely end your session and return to login.

---

## 💡 Assumptions & Notes

- Only events marked **SWAPPABLE** can be involved in swaps.
- Users can flag multiple slots as swappable simultaneously.
- **JWT** tokens are securely stored in browser `localStorage`.
- Backend server should run on `http://localhost:4000` for API calls.
- UI updates are dynamic—no need to reload pages.

---

## 📢 Contribution

PRs are welcome!  
1. Fork the repo  
2. Create a new branch  
3. Make your improvements  
4. Submit a pull request  

---


## 🎨 Screenshots


**SlotSwap** — Built for flexible scheduling and smarter event management.
