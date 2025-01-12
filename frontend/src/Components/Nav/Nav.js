import React, { useState } from "react";
import "./Nav.css";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaUserPlus,
  FaUsers,
  FaEnvelope,
  FaFilePdf,
  FaImages,
} from "react-icons/fa";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/mainhome" className="nav-logo">
          <FaHome className="nav-logo-icon" />
          <span>UserCentral</span>
        </Link>

        <div className="nav-toggle" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

        <ul className={`nav-menu ${isOpen ? "active" : ""}`}>
          <li className="nav-item">
            <Link to="/adduser" className="nav-link">
              <FaUserPlus className="nav-icon" />
              <span>Add User</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/userdetails" className="nav-link">
              <FaUsers className="nav-icon" />
              <span>User Details</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/sendpdf" className="nav-link">
              <FaFilePdf className="nav-icon" />
              <span>Send PDF</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/upload-image" className="nav-link">
              <FaImages className="nav-icon" />
              <span>Gallery</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/cantactus" className="nav-link">
              <FaEnvelope className="nav-icon" />
              <span>Contact Us</span>
            </Link>
          </li>

          <div className="nav-auth">
            <Link to="/regi" className="auth-btn register">
              Register
            </Link>
            <Link to="/log" className="auth-btn login">
              Login
            </Link>
          </div>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
