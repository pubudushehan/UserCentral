import React from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaEnvelope,
  FaPhone,
  FaFacebook,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>
            UserCentral provides comprehensive user management solutions with
            advanced features for modern businesses.
          </p>
          <div className="social-links">
            <a
              href="https://facebook/PubuduShehan.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </a>
            <a
              href="https://https://github.com/pubudushehan?tab=overview&from=2025-01-01&to=2025-01-11.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
            </a>
            <a
              href="https://https://www.linkedin.com/in/pubudu-shehan-37a2132a6/.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Contact Info</h3>
          <div className="contact-info">
            <p>
              <FaHome className="contact-icon" />
              Pitipana, Homagama
            </p>
            <p>
              <FaEnvelope className="contact-icon" />
              pubudushehankarunarathna@gmail.com
            </p>
            <p>
              <FaPhone className="contact-icon" />
              +94 789988379
            </p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 UserCentral. All rights reserved.</p>
        <div className="footer-bottom-links">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
