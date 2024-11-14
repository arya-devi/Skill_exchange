// Success.js
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get the skillId from the URL query parameters
  const queryParams = new URLSearchParams(location.search);
  const skillId = queryParams.get("skillId");

  useEffect(() => {
    const savePaymentRecord = async () => {
      try {
        const userId = localStorage.getItem("userId");
        await axios.post(
          "http://localhost:5000/api/payment/success",
          { skillId, userId },
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );
      } catch (error) {
        console.error("Error saving payment record:", error);
      }
    };

    if (skillId) savePaymentRecord();
  }, [skillId]);

  return (
    <div className="container mt-5">
      <h1>Payment Successful!</h1>
      <p>Thank you for your payment. You can now access the skill.</p>
      <button onClick={() => navigate("/allSkills")} className="btn btn-primary">
        Go Back to Skills
      </button>
    </div>
  );
};

export default Success;
