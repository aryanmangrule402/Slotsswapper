// src/pages/Dashboard.js
import React, { useEffect, useState } from "react";
import axios from "../api/axios";

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch user's own events
  const fetchEvents = async () => {
    try {
      const res = await axios.get("/events"); // ✅ backend route
      setEvents(res.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Create new event
  const createEvent = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/events", { title, startTime, endTime });
      setTitle("");
      setStartTime("");
      setEndTime("");
      fetchEvents(); // refresh list
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  // Update event status (toggle BUSY <-> SWAPPABLE)
  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "BUSY" ? "SWAPPABLE" : "BUSY";
    try {
      await axios.put(`/events/${id}`, { status: newStatus });
      fetchEvents();
    } catch (error) {
      console.error("Error updating event status:", error);
    }
  };

  // Delete event
  const deleteEvent = async (id) => {
    try {
      await axios.delete(`/events/${id}`);
      fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  if (loading) return <p>Loading events...</p>;

  return (
    <div className="container">
      <h1>Your Events</h1>

      <form onSubmit={createEvent} className="form">
        <input
          type="text"
          placeholder="Event title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        />
        <button type="submit">Add Event</button>
      </form>

      <div className="events">
        {events.length === 0 ? (
          <p>No events yet.</p>
        ) : (
          events.map((event) => (
            <div key={event._id} className="event-card">
              <h3>{event.title}</h3>
              <p>
                {new Date(event.startTime).toLocaleString()} -{" "}
                {new Date(event.endTime).toLocaleString()}
              </p>
              <p>Status: <strong>{event.status}</strong></p>
              <button onClick={() => toggleStatus(event._id, event.status)}>
                {event.status === "BUSY" ? "Make Swappable" : "Set Busy"}
              </button>
              <button onClick={() => deleteEvent(event._id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
