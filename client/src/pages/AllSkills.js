import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './AllSkills.css'
import Navbar from "../components/Navbar";

const AllSkills = () => {
  const [skills, setSkills] = useState([]);
  const [search, setSearch] = useState("");
  const [paidOnly, setPaidOnly] = useState("");
  const userId = localStorage.getItem("userId");

  const fetchSkills = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/skill/all", {
        params: { search, paidOnly },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const filteredSkills = response.data.filter(
        (skill) => skill.user._id !== userId
      );
      setSkills(filteredSkills);
      console.log(filteredSkills);
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, [search, paidOnly]);

  const handlePayment = async (skillId) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/payment/create-checkout-session",
        { skillId, userId },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      window.location.href = response.data.url;
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

  return (
    <div>
                           <Navbar />
                           <div className="container">
      <h1 className="heading">All Skills</h1>
      <div className="search-filter">
        <input
          type="text"
          placeholder="Search Skills"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input"
        />
        <select
          className="select"
          value={paidOnly}
          onChange={(e) => setPaidOnly(e.target.value)}
        >
          <option value="">All Skills</option>
          <option value="true">Paid Skills</option>
          <option value="false">Free Skills</option>
        </select>
      </div>

      <div className="skills-grid">
        {skills.map((skill) => (
          <div key={skill._id} className="skill-card hover-shadow">
            <div className="card-body">
              <h5 className="card-title">
                {skill.name}{" "}
                <span className="badge">
                  {skill.price > 0 ? `$${skill.price}` : "Free"}
                </span>
              </h5>
              <p className="card-text">{skill.description}</p>
              <small className="category">Category: {skill.category}</small>
              <div className="button-container">
                {skill.price > 0 && !skill.paidUsers.includes(userId) ? (
                  <button
                    onClick={() => handlePayment(skill._id)}
                    className="pay-button"
                  >
                    Pay and View
                  </button>
                ) : (
                  <Link to={`/viewAnotherProfile/${skill.user._id}`} className="view-button">
                    View
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
    
  );
};

export default AllSkills;
