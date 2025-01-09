import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../Nav/Nav";
import { Link } from "react-router-dom";
import "./Users.css";
import {
  FaSearch,
  FaDownload,
  FaEnvelope,
  FaEdit,
  FaTrash,
  FaWhatsapp,
} from "react-icons/fa";

function Users() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      console.log("API Response:", response.data);

      if (response.data && response.data.users) {
        setUsers(response.data.users);
      } else if (Array.isArray(response.data)) {
        setUsers(response.data);
      } else {
        setUsers([]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      getAllUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleDownloadReport = () => {
    if (!Array.isArray(users) || users.length === 0) {
      alert("No data available to download");
      return;
    }

    const data = users.map((user) => ({
      Name: user.name,
      Email: user.gmail,
      Age: user.age,
      Address: user.address,
    }));

    const csvContent =
      "data:text/csv;charset=utf-8," +
      Object.keys(data[0]).join(",") +
      "\n" +
      data.map((row) => Object.values(row).join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "user_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSendMessage = (email) => {
    window.location.href = `mailto:${email}`;
  };

  const handleWhatsAppMessage = (phone) => {
    // Assuming phone number is stored in the user data
    window.open(`https://wa.me/${phone}`, "_blank");
  };

  const getFilteredUsers = () => {
    if (!Array.isArray(users)) {
      console.log("Users is not an array:", users);
      return [];
    }
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.gmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredUsers = getFilteredUsers();

  return (
    <div>
      <Nav />
      <div className="users-container">
        <div className="users-header">
          <h1>User Management</h1>
          <p>View and manage all registered users</p>
        </div>

        <div className="action-bar">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search users by name, email, or address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="action-buttons">
            <button
              onClick={handleDownloadReport}
              className="action-btn download-btn"
              disabled={!Array.isArray(users) || users.length === 0}
            >
              <FaDownload /> Download Report
            </button>
          </div>
        </div>

        {loading ? (
          <div className="loading-spinner">Loading...</div>
        ) : !Array.isArray(users) || users.length === 0 ? (
          <div className="no-results">No users found</div>
        ) : (
          <div className="users-grid">
            {filteredUsers.map((user) => (
              <div key={user._id} className="user-card">
                <div className="user-info">
                  <h3>{user.name}</h3>
                  <p className="email">{user.gmail}</p>
                  <p className="details">Age: {user.age}</p>
                  <p className="details">Address: {user.address}</p>
                </div>
                <div className="card-actions">
                  <button
                    onClick={() => handleSendMessage(user.gmail)}
                    className="action-icon-btn email-btn"
                    title="Send Email"
                  >
                    <FaEnvelope />
                  </button>
                  <button
                    onClick={() => handleWhatsAppMessage(user.phone)}
                    className="action-icon-btn whatsapp-btn"
                    title="Send WhatsApp Message"
                  >
                    <FaWhatsapp />
                  </button>
                  <Link
                    to={`/updateuser/${user._id}`}
                    className="action-icon-btn edit-btn"
                    title="Edit User"
                  >
                    <FaEdit />
                  </Link>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="action-icon-btn delete-btn"
                    title="Delete User"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Users;
