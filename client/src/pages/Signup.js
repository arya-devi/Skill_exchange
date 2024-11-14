import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const user = localStorage.getItem("token");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Clear any previous errors
    setMessage(""); // Clear any previous messages

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        formData
      );
      setMessage(response.data.message);
      if (response.status === 201) {
        setMessage("");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
        
      if (error.response && error.response.status === 400) {
        const errors = error.response.data.errors || [error.response.data.message];
        setErrors(errors);
      } else {
        setMessage("Internal Server Error");
      }
    }
  };

  return (
    <div>
      <div className="container-fluid mt-5">

      <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1000 }}>
      <div className="card text-center shadow" style={{ width: '250px', borderRadius: '8px', backgroundColor: '#f8f9fa' }}>
        <div className="card-body">
          <i className="bi bi-person-fill" style={{ fontSize: '30px', marginBottom: '10px', color: '#795757' }}></i>
          <h5 className="card-title">{user ? 'View as a User' : 'View as a Guest'}</h5>
          <Link style={{ color: "white", backgroundColor: "#795757" }} to="/main" className="btn">
           Go to Home
          </Link>
        </div>
      </div>
    </div>

        <div className="row justify-content-center">
          <div className="col-md-6">
            <h2 style={{ color: "white", backgroundColor: "#795757",marginTop:"200px" }} className="text-center p-3">Sign Up</h2>
            <form onSubmit={handleSubmit}>
              {/* Email Field */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              {/* Password Field */}
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>

              {/* Confirm Password Field */}
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
              </div>

              {/* Submit Button */}
              <button style={{ color: "white", backgroundColor: "#795757" }} type="submit" className="btn w-100">
                Submit
              </button>
              <p className="mt-5 text-center">
                Already have an account?<Link to={"/login"}>Login</Link>
              </p>
            </form>

            {message && (
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            )}

            {/* Validation Errors */}
            {errors.length > 0 &&
              errors.map((error, index) => (
                <div key={index} className="alert alert-danger" role="alert">
                  <p>{error}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
