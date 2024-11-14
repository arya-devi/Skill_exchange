import React, { useEffect, useState } from "react"; 
import axios from "axios";
import './MessageRequest.css'
import Navbar from "../components/Navbar";

const MessageRequest = ({ userId }) => {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/request', {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setRequests(response.data);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  const handleResponse = async (requestId, status) => {
    try {
      await axios.post('http://localhost:5000/api/request/respond', { requestId, status }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchRequests(); // Refresh requests after responding
    } catch (error) {
      console.error("Error responding to request:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div>
                   <Navbar />
                   <div className="message-request-container">
      <h2 className="message-request-header">Message Requests</h2>
      {requests && requests.length > 0 ? (
  <ul className="request-list">
    {requests.map(request => (
      <li key={request._id} className="request-item">
        <span className="request-sender">{request.sender.name}</span> - <span className="request-status">{request.status}</span>
        <button 
          className="accept-button" 
          onClick={() => handleResponse(request._id, 'accepted')}
        >
          Accept
        </button>
        <button 
          className="decline-button" 
          onClick={() => handleResponse(request._id, 'declined')}
        >
          Decline
        </button>
      </li>
    ))}
  </ul>
) : (
  <h5 style={{textAlign:'center'}}>No requests available</h5>  // You can display a message indicating that there are no requests
)}
      
    </div>
    </div>
   
  );
};

export default MessageRequest;
