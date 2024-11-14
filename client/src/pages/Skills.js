import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Skills.css"; // Assuming you save your CSS file in the same directory
import Navbar from "../components/Navbar";

const UserSkills = () => {
  const [skills, setSkills] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: 0,
  });
  const [editMode, setEditMode] = useState(false);
  const [editSkillId, setEditSkillId] = useState(null);

  const fetchUserSkills = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/skill/user", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setSkills(response.data);
    } catch (error) {
      console.error("Error fetching user skills:", error);
    }
  };

  useEffect(() => {
    fetchUserSkills();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(
          `http://localhost:5000/api/skill/${editSkillId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setEditMode(false);
        setEditSkillId(null);
      } else {
        const response = await axios.post(
          "http://localhost:5000/api/skill/add",
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setSkills([...skills, response.data]);
      }
      setFormData({ name: "", description: "", category: "", price: 0 });
      fetchUserSkills();
    } catch (error) {
      console.error("Error adding/updating skill:", error);
    }
  };

  const handleEdit = (skill) => {
    setEditMode(true);
    setEditSkillId(skill._id);
    setFormData({
      name: skill.name,
      description: skill.description,
      category: skill.category,
      price: skill.price,
    });
  };

  const handleDelete = async (skillId) => {
    try {
      await axios.delete(`http://localhost:5000/api/skill/${skillId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setSkills(skills.filter((skill) => skill._id !== skillId));
    } catch (error) {
      console.error("Error deleting skill:", error);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="container">
        <h1>My Skills</h1>
        {skills.length === 0 && (
          <p>No skills added yet. Use the form below to add a skill.</p>
        )}

        <form onSubmit={handleSubmit}>
          <h5>{editMode ? "Edit Skill" : "Add New Skill"}</h5>
          <div className="form-group">
            <label htmlFor="name">Skill Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter skill name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              placeholder="Enter skill description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              name="category"
              placeholder="Enter category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              name="price"
              placeholder="Enter price (0 for free)"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">
            {editMode ? "Update Skill" : "Add Skill"}
          </button>
        </form>

        <div>
          {skills.map((skill) => (
            <div key={skill._id} className="skill-card">
              <span className="skill-price">
                {skill.price > 0 ? `$${skill.price}` : "Free"}
              </span>
              <h5>{skill.name}</h5>
              <p>{skill.description}</p>
              <small>Category: {skill.category}</small>
              <div className="button-group">
                <button onClick={() => handleEdit(skill)}>Edit</button>
                <button onClick={() => handleDelete(skill._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserSkills;
