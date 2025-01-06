import React, { useState } from "react";
import Nav from "../Nav/Nav";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddUser.css";

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
    console.log(inputs);
    sendRequest().then(() => history("/userdetails"));
  };

  const sendRequest = async () => {
    await axios
      .post("http://localhost:5000/users", {
        name: String(inputs.name),
        gmail: String(inputs.gmail),
        age: Number(inputs.age),
        address: String(inputs.address),
      })
      .then((res) => res.data);
  };

  return (
    <div>
      <Nav />
      <h1>Add User Page</h1>
      <form onSubmit={handleSubmit}>
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

        <div>
          <label>Age</label>
          <br />
          <input
            type="number"
            name="age"
            value={inputs.age}
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
            value={inputs.address}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Add User</button>
      </form>
    </div>
  );
}

export default AddUser;
