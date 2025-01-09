import React, { useState } from "react";
import Nav from "../Nav/Nav";
import axios from "axios";
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
      <h1>Register Users</h1>
      <form onSubmit={handleSubmit}>
        {/* Name input */}
        <div>
          <label>Name</label>
          <br />
          <input
            type="text"
            name="name"
            value={inputs.name}
            onChange={handleChange}
            required
          />
        </div>

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

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
