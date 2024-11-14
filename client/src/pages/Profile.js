// Profile.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import './Profile.css'
import Navbar from "../components/Navbar";

const Profile = () => {
  const profileImg =
    "https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-PNG-Clipart-Background.png";

  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    location: "",
    email: "",
    profilePicture: "",
    skills: [],
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("/api/user/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUser(response.data);
        setFormData({
          name: response.data.name,
          bio: response.data.bio,
          location: response.data.location,
          email: response.data.email,
          profilePicture: response.data.profilePicture || profileImg,
          skills: response.data.skills || [],
        });
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put("/api/user/profile", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUser(response.data);
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your profile?")) {
      setFormData({
        name: '',
        bio: '',
        location: '',
        email: '',
        profilePicture: '',
        skills: []
      });
    }
  };

  return (
    <div>
           <Navbar />
           <div className="profile-container">
      <h1 className="profile-title">My Profile</h1>
      {user ? (
        <div className="profile-card">
          <div className="profile-image">
            <img
              src={profileImg}
              alt="Profile"
              className="profile-img"
            />
          </div>
          <h3>{formData.name}</h3>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Bio:</strong> {formData.bio}</p>
          <p><strong>Location:</strong> {formData.location}</p>
          <p><strong>Skills:</strong> {formData.skills.length > 0 ? formData.skills.map(skill => <span className="skill-box" key={skill}>{skill}</span>) : "No skills listed"}</p>
          <div className="profile-actions">
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={handleDelete} className="delete-button">Delete Profile</button>
          </div>

          {isEditing && (
            <form onSubmit={handleSubmit} className="edit-form">
              <div>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
              </div>
              <div>
                <label htmlFor="bio">Bio</label>
                <textarea id="bio" name="bio" value={formData.bio} onChange={handleChange} placeholder="Bio" />
              </div>
              <div>
                <label htmlFor="location">Location</label>
                <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} placeholder="Location" />
              </div>
              <div>
                <label htmlFor="skills">Skills (comma separated)</label>
                <input
                  type="text"
                  id="skills"
                  name="skills"
                  value={formData.skills.join(", ")}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      skills: e.target.value.split(",").map((skill) => skill.trim()),
                    })
                  }
                  placeholder="Skills"
                />
              </div>
              <button type="submit">Update Profile</button>
              <button type="button" onClick={() => setIsEditing(false)} className="cancel-button">Cancel</button>
            </form>
          )}
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
    </div>

    
  );
};

export default Profile;
