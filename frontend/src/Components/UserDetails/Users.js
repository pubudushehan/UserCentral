import React, { useEffect, useRef, useState } from "react";
import Nav from "../Nav/Nav";
import axios from "axios";
import User from "../User/User";
import { useReactToPrint } from "react-to-print";
import "./Users.css";

const URL = "http://localhost:5000/users";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function Users() {
  const [users, setUsers] = useState([]);
  const componentRef = useRef();

  useEffect(() => {
    fetchHandler().then((data) => setUsers(data.users));
  }, []);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Users-Report",
    onAfterPrint: () => alert("Report Downloaded Successfully!"),
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  const handleSearch = () => {
    fetchHandler().then((data) => {
      const filteredUsers = data.users.filter((user) =>
        Object.values(user).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setUsers(filteredUsers);
      setNoResults(filteredUsers.length === 0);
    });
  };

  const handleSendReport = () => {
    // Create the WhatsApp chat URL
    const phoneNumber = "+94789988379"; // Ensure the phone number is in the correct format
    const message = "Selected User Reports";
    const WhatsAppUrl = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
      message
    )}`;

    // Open the WhatsApp chat in a new window
    window.open(WhatsAppUrl, "_blank");
  };

  return (
    <div>
      <Nav />
      <div className="container">
        <h1>User Details Display Page</h1>
        <input
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          name="search"
          placeholder="Search User Details"
        ></input>
        <button onClick={handleSearch}>Search</button>

        {noResults ? (
          <div>
            <p>No Users Found</p>
          </div>
        ) : (
          <div className="print-container" ref={componentRef}>
            <div className="users-grid">
              {users.map((user) => (
                <div key={user._id} className="user-card">
                  <User user={user} />
                </div>
              ))}
            </div>
          </div>
        )}
        <button className="print-button" onClick={handlePrint}>
          Download Report
        </button>
        <button className="print-button" onClick={handleSendReport}>
          Send Whatsapp Message
        </button>
      </div>
    </div>
  );
}

export default Users;
