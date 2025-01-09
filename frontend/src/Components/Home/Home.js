// rfce type and enter as shortcut
import React from "react";
import Nav from "../Nav/Nav";
import "./Home.css";
import { Link } from "react-router-dom";
import { FaUsers, FaFileUpload, FaImages } from "react-icons/fa";

function Home() {
  return (
    <div>
      <Nav />
      <div className="home-container">
        <section className="hero-section">
          <div className="hero-content">
            <h1>Welcome to User Central</h1>
            <p>Your Complete Management Solution</p>
            <div className="hero-buttons">
              <Link to="/regi" className="primary-btn">
                Get Started
              </Link>
              <Link to="/cantactus" className="secondary-btn">
                Contact Us
              </Link>
            </div>
          </div>
        </section>

        <section className="features-section">
          <h2>Our Services</h2>
          <div className="features-grid">
            <div className="feature-card">
              <FaUsers className="feature-icon" />
              <h3>User Management</h3>
              <p>Efficiently manage user information with easy-to-use tools</p>
              <Link to="/userdetails" className="feature-link">
                Manage Users
              </Link>
            </div>

            <div className="feature-card">
              <FaFileUpload className="feature-icon" />
              <h3>Document Upload</h3>
              <p>Securely upload and manage PDF documents</p>
              <Link to="/sendpdf" className="feature-link">
                Upload Documents
              </Link>
            </div>

            <div className="feature-card">
              <FaImages className="feature-icon" />
              <h3>Image Gallery</h3>
              <p>Create and manage beautiful image collections</p>
              <Link to="/upload-image" className="feature-link">
                Manage Gallery
              </Link>
            </div>
          </div>
        </section>

        <section className="stats-section">
          <div className="stat-card">
            <h3>1000+</h3>
            <p>Active Users</p>
          </div>
          <div className="stat-card">
            <h3>5000+</h3>
            <p>Documents</p>
          </div>
          <div className="stat-card">
            <h3>24/7</h3>
            <p>Support</p>
          </div>
        </section>

        <section className="cta-section">
          <h2>Ready to Get Started?</h2>
          <p>Join thousands of satisfied users today</p>
          <Link to="/regi" className="cta-button">
            Sign Up Now
          </Link>
        </section>
      </div>
    </div>
  );
}

export default Home;
