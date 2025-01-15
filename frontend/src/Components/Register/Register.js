import React, { useState } from "react";
import Nav from "../Nav/Nav";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import "./Register.css";

function Register() {
  // State for form inputs
  const [inputs, setInputs] = useState({
    name: "",
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
      // Send registration request to backend
      await axios.post("http://localhost:5000/register", {
        name: inputs.name,
        gmail: inputs.gmail,
        password: inputs.password,
      });
      alert("User registered successfully!");
    } catch (err) {
      console.error("Error registering user:", err);
    }
  };

  return (
    <div>
      <Nav />
      <div className="register-container">
        <div className="register-content">
          <div className="register-header">
            <h1>Create Account</h1>
            <p>Join User Central today</p>
          </div>

          <form onSubmit={handleSubmit} className="register-form">
            <div className="form-group">
              <div className="input-icon">
                <FaUser className="icon" />
              </div>
              <div className="input-container">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={inputs.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your name"
                />
              </div>
            </div>

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

            <button type="submit" className="register-btn">
              Register
            </button>

            <div className="login-link">
              Already have an account?
              <Link to="/log">Login here</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
