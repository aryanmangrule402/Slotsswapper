import React, { useEffect, useState } from "react";
import axios from "../api/axios";

export default function Marketplace() {
  const [slots, setSlots] = useState([]);
  const [mySlots, setMySlots] = useState([]);
  const [selectedMySlot, setSelectedMySlot] = useState("");
  const [selectedTargetSlot, setSelectedTargetSlot] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  // ✅ Fetch available slots from other users
  const fetchSlots = async () => {
    try {
      const res = await axios.get("/swaps/swappable-slots", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSlots(res.data);
    } catch (err) {
      console.error("Error fetching swappable slots:", err);
      setMessage("Failed to load slots.");
    }
  };

  // ✅ Fetch my swappable slots
  const fetchMySlots = async () => {
    try {
      const res = await axios.get("/events", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const swappable = res.data.filter((event) => event.status === "SWAPPABLE");
      setMySlots(swappable);
    } catch (err) {
      console.error("Error fetching my slots:", err);
    }
  };

  useEffect(() => {
    fetchSlots();
    fetchMySlots();
  }, []);

  // ✅ Handle swap request
const requestSwap = async () => {
  if (!selectedMySlot) {
    alert("Please select one of your own swappable slots.");
    return;
  }

  try {
    await axios.post(
      "/swaps/request-swap",
      { mySlotId: selectedMySlot, theirSlotId: selectedTargetSlot._id },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    alert("Swap request sent successfully!");
    setShowModal(false);
    setSelectedMySlot("");
  } catch (err) {
    console.error("Error sending swap request:", err);
    alert("Failed to send swap request.");
  }
};

  return (
    <div className="marketplace-container">
      <h1>🎯 Marketplace</h1>
      <p>Browse other users’ swappable slots and offer your own.</p>

      {message && <p className="error">{message}</p>}

      <div className="slot-list">
        {slots.length > 0 ? (
          slots.map((slot) => (
            <div key={slot._id} className="slot-card">
              <h3>{slot.title}</h3>
              <p>
                <strong>From:</strong>{" "}
                {new Date(slot.startTime).toLocaleString()}
              </p>
              <p>
                <strong>To:</strong> {new Date(slot.endTime).toLocaleString()}
              </p>
              <button
                onClick={() => {
                  setSelectedTargetSlot(slot);
                  setShowModal(true);
                }}
              >
                Request Swap
              </button>
            </div>
          ))
        ) : (
          <p>No swappable slots available right now.</p>
        )}
      </div>

      {/* Swap modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Select one of your swappable slots</h2>

            <select
              value={selectedMySlot}
              onChange={(e) => setSelectedMySlot(e.target.value)}
            >
              <option value="">-- Select your slot --</option>
              {mySlots.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.title} ({new Date(s.startTime).toLocaleDateString()})
                </option>
              ))}
            </select>

            <div className="modal-actions">
              <button onClick={requestSwap}>Send Request</button>
              <button className="cancel" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
