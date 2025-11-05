import React, { useEffect, useState } from "react";
import axios from "../api/axios";

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [message, setMessage] = useState("");

  const fetchEvents = async () => {
    try {
      const res = await axios.get("/events", { headers: { Authorization: localStorage.getItem("token") } });
      setEvents(res.data);
    } catch {
      setMessage("Failed to fetch events");
    }
  };

  const addEvent = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/events", { title, startTime, endTime }, { headers: { Authorization: localStorage.getItem("token") } });
      setTitle(""); setStartTime(""); setEndTime("");
      fetchEvents();
    } catch {
      setMessage("Failed to add event");
    }
  };

  const toggleSwappable = async (id, status) => {
    const newStatus = status === "BUSY" ? "SWAPPABLE" : "BUSY";
    try {
      await axios.put(`/events/${id}`, { status: newStatus }, { headers: { Authorization: localStorage.getItem("token") } });
      fetchEvents();
    } catch {
      setMessage("Failed to update status");
    }
  };

  useEffect(() => { fetchEvents(); }, []);

  return (
    <div className="container">
      <h1>My Events</h1>
      {message && <p style={{ color: "red" }}>{message}</p>}
      <form onSubmit={addEvent}>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Event Title" required />
        <input type="datetime-local" value={startTime} onChange={e => setStartTime(e.target.value)} required />
        <input type="datetime-local" value={endTime} onChange={e => setEndTime(e.target.value)} required />
        <button type="submit">Add Event</button>
      </form>

      <ul>
        {events.map(ev => (
          <li key={ev._id}>
            {ev.title} | {new Date(ev.startTime).toLocaleString()} - {new Date(ev.endTime).toLocaleString()} | {ev.status}
            <button onClick={() => toggleSwappable(ev._id, ev.status)}>
              {ev.status === "BUSY" ? "Make Swappable" : "Make Busy"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
