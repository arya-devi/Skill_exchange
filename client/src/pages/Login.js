import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { msg } = useParams();
  const { notLoggedIn } = useParams();
  console.log(notLoggedIn);
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  useEffect(() => {
    if (msg||notLoggedIn) {
      setMessage(notLoggedIn);
    }
  }, [msg,notLoggedIn]);
 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );
      console.log(response);
      setMessage(response.data.message); // Show success message if login is successful
      console.log(response.data.token);
      const token = response.data.token; 
      const userId = response.data.userId; 
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId); 
      if (token) {
        // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
      navigate("/home");
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Internal Server Error");
      }
    }
  };

  return (
    <div className="container-fluid mt-5">
      <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1000 }}>
        <div
          className="card text-center shadow"
          style={{
            width: "250px",
            borderRadius: "8px",
            backgroundColor: "#f8f9fa",
          }}
        >
          <div className="card-body">
            <i
              className="bi bi-person-fill"
              style={{
                fontSize: "30px",
                marginBottom: "10px",
                color: "#795757",
              }}
            ></i>
            <h5 className="card-title">View as a Guest</h5>
            <Link
              style={{ color: "white", backgroundColor: "#795757" }}
              to="/main"
              className="btn"
            >
              Go to Main
            </Link>
          </div>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 style={{ color: "white", backgroundColor: "#795757",marginTop:"200px" }} className="text-center p-3">Login</h2>
          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required
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
                required
              />
            </div>

            {/* Submit Button */}
            <button style={{ color: "white", backgroundColor: "#795757" }} type="submit" className="btn w-100">
              Submit
            </button>
          </form>
          <p className="mt-5 text-center">
            Don't have an account?<Link to={"/"}>Sign Up</Link>
          </p>

          {message && (
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
