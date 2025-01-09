import React, { useState } from "react";
import Nav from "../Nav/Nav";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        {/* Email input */}
        <div>
          <label>Email</label>
          <br />
          <input
            type="email"
            name="gmail"
            value={inputs.gmail}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password input */}
        <div>
          <label>Password</label>
          <br />
          <input
            type="password"
            name="password"
            value={inputs.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
