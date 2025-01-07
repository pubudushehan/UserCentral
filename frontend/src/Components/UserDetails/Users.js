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

  return (
    <div>
      <Nav />
      <div className="container">
        <h1>User Details Display Page</h1>
        <div className="print-container" ref={componentRef}>
          <div className="users-grid">
            {users.map((user) => (
              <div key={user._id} className="user-card">
                <User user={user} />
              </div>
            ))}
          </div>
        </div>
        <button className="print-button" onClick={handlePrint}>
          Download Report
        </button>
      </div>
    </div>
  );
}

export default Users;
