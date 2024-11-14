import React, { useEffect, useState } from "react"; 
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import './ViewAnotherProfile.css'
import Navbar from "../components/Navbar";

const ViewAnotherProfile = () => {
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState(null);
  const profileImg = "https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-PNG-Clipart-Background.png";
  const navigate = useNavigate();
  const { userId } = useParams(); // Get userId from URL parameters
  console.log(userId);

  const [userProfile, setUserProfile] = useState(null);

  // Fetch user profile based on userId
  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/user/profile/${userId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setUserProfile(response.data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [userId]);

  if (!userProfile) {
    return <p>Loading...</p>;
  }

  const handleRequest = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/request/send`, { receiverId: userId }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log(response.data.status);
      setStatus(response.data.status);
      alert("Request sent");
    } catch (error) {
      setMessage('Request already sent!');
      console.error("Error sending request:", error);
    }
  };

  const handleMessage = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/request/chat/${userId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log(response);

      // Find the request where the current user is the sender and the status is "accepted"
      const acceptedRequest = response.data.find(
        (request) =>
          request.status === 'accepted' &&
          request.sender === localStorage.getItem("userId") && // Check if the current user is the sender
          request.receiver === userId // Check if the receiver is the one we're messaging
      );

      if (acceptedRequest) {
        // If there is an accepted request from the current user to this receiver
        navigate(`/chat/${userId}`);
      } else {
        // If no accepted request found, show a message
        setMessage('You can only message if the request is accepted by the receiver');
      }
    } catch (error) {
      console.error("Error checking chat status:", error);
      setMessage('Error checking chat status');
    }
  };

  return (
    <div>
          <Navbar />

        <div className="profile-container">
      <img className="profile-img" src={profileImg} alt="Profile" />
      <h1 className="profile-header">{userProfile.name}'s Profile</h1>
      <p className="profile-details">
        <strong>Name:</strong> {userProfile.name}
      </p>
      <p className="profile-details">
        <strong>Email:</strong> {userProfile.email}
      </p>
      <p className="profile-details">
        <strong>Location:</strong> {userProfile.location}
      </p>
      <p className="profile-details">
        <strong>Bio:</strong> {userProfile.bio}
      </p>
      <p className="profile-details">
        <strong>Skills:</strong>{" "}
        {userProfile.skills.map((skill) => skill).join(", ")}
      </p>

      {/* Request and Message Buttons */}
      <div className="buttons-container">
        <button onClick={handleRequest} className="request-button">Request</button>
        <button onClick={handleMessage} className="message-button">Message</button>
      </div>

      {message && (
        <p className="error-message">{message}</p>
      )}
    </div>
    </div>

    
  );
};

export default ViewAnotherProfile;
