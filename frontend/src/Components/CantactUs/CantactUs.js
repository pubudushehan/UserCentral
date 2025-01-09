import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import Nav from "../Nav/Nav";
import "./CantactUs.css";
import { FaUser, FaEnvelope, FaCommentAlt, FaPaperPlane } from "react-icons/fa";

function CantactUs() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_hdjnksc",
        "template_l2s707l",
        form.current,
        "zNyYfj7M45khErkw1"
      )
      .then(
        (result) => {
          console.log("SUCCESS!", result.text);
          alert("Message sent successfully!");
          form.current.reset();
        },
        (error) => {
          console.log("FAILED...", error.text);
          alert("Failed to send message. Please try again.");
        }
      );
  };

  return (
    <div>
      <Nav />
      <div className="contact-container">
        <div className="contact-content">
          <div className="contact-header">
            <h1>Contact Us</h1>
            <p>Get in touch with our team</p>
          </div>

          <form ref={form} onSubmit={sendEmail} className="contact-form">
            <div className="form-group">
              <div className="input-icon">
                <FaUser className="icon" />
              </div>
              <div className="input-container">
                <label>Name</label>
                <input
                  type="text"
                  name="user_name"
                  required
                  placeholder="Enter your name"
                />
              </div>
            </div>

            <div className="form-group">
              <div className="input-icon">
                <FaEnvelope className="icon" />
              </div>
              <div className="input-container">
                <label>Email</label>
                <input
                  type="email"
                  name="user_email"
                  required
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="form-group">
              <div className="input-icon">
                <FaCommentAlt className="icon" />
              </div>
              <div className="input-container">
                <label>Message</label>
                <textarea
                  name="message"
                  required
                  placeholder="Type your message here..."
                />
              </div>
            </div>

            <button type="submit" className="send-button">
              <FaPaperPlane /> Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CantactUs;
