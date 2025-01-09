import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const User = (props) => {
  const { _id, name, gmail, age, address } = props.user;

  // Improved delete handler with better error handling
  const deleteHandler = async () => {
    try {
      // Show confirmation dialog
      const isConfirmed = window.confirm(
        "Are you sure you want to delete this user?"
      );

      if (!isConfirmed) {
        return; // If user cancels, don't proceed with deletion
      }

      // Send delete request to backend
      const response = await axios.delete(`http://localhost:5000/users/${_id}`);

      if (response.status === 200) {
        alert("User deleted successfully!");
        // Refresh the page or update the user list
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert(
        error.response?.data?.message ||
          "Failed to delete user. Please try again."
      );
    }
  };

  return (
    <div>
      <h2>{name}</h2>
      <p>Email: {gmail}</p>
      <p>Age: {age}</p>
      <p>Address: {address}</p>
      <div>
        <Link to={`/userdetails/${_id}`}>
          <button>Update</button>
        </Link>
        <button onClick={deleteHandler}>Delete</button>
      </div>
    </div>
  );
};

export default User;
