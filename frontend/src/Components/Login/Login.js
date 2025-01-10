import React, { useState } from "react";
import Nav from "../Nav/Nav";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import "./Login.css";

function Login() {
  // Initialize navigation hook
  const navigate = useNavigate();

  // State for form inputs
  const [inputs, setInputs] = useState({
    gmail: "",
    password: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send login request to backend
      const response = await axios.post("http://localhost:5000/login", {
        gmail: inputs.gmail,
        password: inputs.password,
      });

      // Handle login response
      if (response.data.status === "ok") {
        alert("Login successful!");
        navigate("/mainhome"); // Redirect to home page
      } else {
        alert(
          response.data.err || "Login failed. Please check your credentials."
        );
      }
    } catch (err) {
      console.error("Error logging in:", err);
      alert("Error during login. Please try again.");
    }
  };

  return (
    <div>
      <Nav />
      <div className="login-container">
        <div className="login-content">
          <div className="login-header">
            <h1>Welcome Back</h1>
            <p>Login to access your account</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <div className="input-icon">
                <FaEnvelope className="icon" />
              </div>
              <div className="input-container">
                <label>Email</label>
                <input
                  type="email"
                  name="gmail"
                  value={inputs.gmail}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="form-group">
              <div className="input-icon">
                <FaLock className="icon" />
              </div>
              <div className="input-container">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={inputs.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <button type="submit" className="login-btn">
              Login
            </button>

            <div className="register-link">
              Don't have an account?
              <Link to="/regi">Register here</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
