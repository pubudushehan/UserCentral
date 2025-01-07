import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Nav from "../Nav/Nav";
import "./UpdateUser.css"; // You can create this file with the same styles as AddUser.css

function UpdateUser() {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    gmail: "",
    age: "",
    address: "",
  });
  const id = useParams().id;

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${id}`);
        setInputs(response.data.user);
      } catch (err) {
        console.log("Error fetching user:", err);
      }
    };
    fetchHandler();
  }, [id]);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async () => {
    try {
      await axios.put(`http://localhost:5000/users/${id}`, {
        name: String(inputs.name),
        gmail: String(inputs.gmail),
        age: Number(inputs.age),
        address: String(inputs.address),
      });
    } catch (err) {
      console.log("Error updating user:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendRequest();
    history("/userdetails");
  };

  return (
    <div>
      <Nav />
      <h1>Update User Details</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <br />
          <input
            type="text"
            name="name"
            value={inputs.name || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Email</label>
          <br />
          <input
            type="email"
            name="gmail"
            value={inputs.gmail || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Age</label>
          <br />
          <input
            type="number"
            name="age"
            value={inputs.age || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Address</label>
          <br />
          <input
            type="text"
            name="address"
            value={inputs.address || ""}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Update User</button>
      </form>
    </div>
  );
}

export default UpdateUser;
