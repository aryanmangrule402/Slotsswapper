import React, { useEffect, useState } from "react";
import axios from "../api/axios";

export default function Requests() {
  const [incoming, setIncoming] = useState([]);
  const [outgoing, setOutgoing] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchRequests = async () => {
    try {
      // ✅ Updated endpoint to match backend
      const res = await axios.get("/swaps/swap-requests", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIncoming(res.data.incoming || []);
      setOutgoing(res.data.outgoing || []);
    } catch (err) {
      console.error("Error fetching requests:", err);
      alert("Failed to fetch swap requests.");
    } finally {
      setLoading(false);
    }
  };

  const handleResponse = async (id, accept) => {
    try {
      // ✅ Parameter name should match backend: { accept }
      await axios.post(
        `/swaps/swap-response/${id}`,
        { accept },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(accept ? "Swap accepted ✅" : "Swap rejected ❌");
      fetchRequests(); // refresh data
    } catch (err) {
      console.error("Error responding to swap:", err);
      alert("Error processing response.");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading) return <p>Loading requests...</p>;

  return (
    <div className="requests-container">
      <h1>📬 Swap Requests</h1>

      <section>
        <h2>Incoming Requests</h2>
        {incoming.length === 0 ? (
          <p>No incoming requests.</p>
        ) : (
          incoming.map((req) => (
            <div key={req._id} className="request-card">
              <p>
                <strong>{req.requester?.name || "Someone"}</strong> wants to
                swap <em>{req.theirSlot?.title}</em> with your{" "}
                <em>{req.mySlot?.title}</em>
              </p>
              <div className="request-actions">
                <button
                  className="accept"
                  onClick={() => handleResponse(req._id, true)}
                >
                  Accept
                </button>
                <button
                  className="reject"
                  onClick={() => handleResponse(req._id, false)}
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        )}
      </section>

      <section>
        <h2>Outgoing Requests</h2>
        {outgoing.length === 0 ? (
          <p>No outgoing requests.</p>
        ) : (
          outgoing.map((req) => (
            <div key={req._id} className="request-card">
              <p>
                You requested <em>{req.theirSlot?.title}</em> from{" "}
                <strong>{req.responder?.name}</strong>
              </p>
              <p>Status: {req.status}</p>
            </div>
          ))
        )}
      </section>
    </div>
  );
}
