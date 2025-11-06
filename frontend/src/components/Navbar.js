import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [userName, setUserName] = useState("");

  // Fetch logged-in user's info
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;
      try {
        const res = await axios.get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserName(res.data.name); // assuming backend returns {name, email,...}
      } catch (err) {
        console.error("Error fetching user info:", err);
      }
    };
    fetchUser();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => navigate("/")}>
        🎯 SlotSwap
      </div>

      <ul className="navbar-links">
        {token && (
          <>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/marketplace">Marketplace</Link>
            </li>
            <li>
              <Link to="/requests">Requests</Link>
            </li>
          </>
        )}
      </ul>

      <div className="navbar-auth">
        {token ? (
          <>
            <span className="username">Hi, {userName}</span>
            <button onClick={handleLogout} className="auth-btn logout">
              Logout
            </button>
          </>
        ) : (
          <>
            <button onClick={() => navigate("/login")} className="auth-btn">
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="auth-btn signup"
            >
              Signup
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
