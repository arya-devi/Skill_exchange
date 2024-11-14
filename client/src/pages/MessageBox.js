import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const MessageBox = () => {
  const [acceptedRequests, setAcceptedRequests] = useState([]);

  // Fetch accepted message requests
  const fetchAcceptedRequests = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/request/accepted", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setAcceptedRequests(response.data);
    } catch (error) {
      console.error("Error fetching accepted message requests", error);
    }
  };

  useEffect(() => {
    fetchAcceptedRequests();
  }, []);

  return (
    <div>
                   <Navbar />
                   <div className="container mt-5">
      <h2>Your Message Box</h2>
      <div className="list-group mt-4">
        {acceptedRequests.length > 0 ? (
          acceptedRequests.map((request) => (
            <div key={request._id} className="list-group-item d-flex align-items-center mb-2 shadow-sm mt-2">
              <img
                src="https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-PNG-Clipart-Background.png"
                alt="User Avatar"
                className="rounded-circle"
                style={{ width: "50px", height: "50px", marginRight: "15px" }}
              />
              <div className="flex-grow-1">
                <h6 className="mb-1">{request.receiver.name}</h6>
                <p className="mb-0 text-muted small">Click to view messages.</p>
              </div>
              <Link
                to={`/chat/${request.receiver._id}`}
                className="btn btn-outline-primary btn-sm"
              >
                Chat
              </Link>
            </div>
          ))
        ) : (
          <div className="alert alert-info" role="alert">
            You have no accepted message requests yet.
          </div>
        )}
      </div>
    </div>
    </div>
    
  );
};

export default MessageBox;
