import React, { useState } from "react";
import Nav from "../Nav/Nav";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddUser.css";
import {
  FaUser,
  FaEnvelope,
  FaBirthdayCake,
  FaMapMarkerAlt,
} from "react-icons/fa";

function AddUser() {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    gmail: "",
    age: "",
    address: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendRequest();
      window.alert("User Added Successfully");
      history("/userdetails");
    } catch (error) {
      window.alert("Error adding user. Please try again.");
    }
  };

  const sendRequest = async () => {
    return await axios.post("http://localhost:5000/users", {
      name: String(inputs.name),
      gmail: String(inputs.gmail),
      age: Number(inputs.age),
      address: String(inputs.address),
    });
  };

  return (
    <div>
      <Nav />
      <div className="adduser-container">
        <div className="adduser-content">
          <div className="adduser-header">
            <h1>Add New User</h1>
            <p>Enter user details to create a new account</p>
          </div>

          <form onSubmit={handleSubmit} className="adduser-form">
            <div className="form-group">
              <div className="input-icon">
                <FaUser className="icon" />
              </div>
              <div className="input-container">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={inputs.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter full name"
                />
              </div>
            </div>

            <div className="form-group">
              <div className="input-icon">
                <FaEnvelope className="icon" />
              </div>
              <div className="input-container">
                <label>Email Address</label>
                <input
                  type="email"
                  name="gmail"
                  value={inputs.gmail}
                  onChange={handleChange}
                  required
                  placeholder="Enter email address"
                />
              </div>
            </div>

            <div className="form-group">
              <div className="input-icon">
                <FaBirthdayCake className="icon" />
              </div>
              <div className="input-container">
                <label>Age</label>
                <input
                  type="number"
                  name="age"
                  value={inputs.age}
                  onChange={handleChange}
                  required
                  placeholder="Enter age"
                />
              </div>
            </div>

            <div className="form-group">
              <div className="input-icon">
                <FaMapMarkerAlt className="icon" />
              </div>
              <div className="input-container">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={inputs.address}
                  onChange={handleChange}
                  required
                  placeholder="Enter address"
                />
              </div>
            </div>

            <button type="submit" className="submit-btn">
              Add User
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddUser;
