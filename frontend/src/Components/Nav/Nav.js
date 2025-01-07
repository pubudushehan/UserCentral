import React from "react";
import "./Nav.css"; // Import CSS for styling
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div>
      <ul className="home-ul">
        <li className="home-li">
          <Link to="/mainhome" className="active home-a">
            <h1>home</h1>
          </Link>
        </li>
        <li className="home-li">
          <Link to="/adduser" className="active home-a">
            <h1>ADD user</h1>
          </Link>
        </li>
        <li className="home-li">
          <Link to="/userdetails" className="active home-a">
            <h1>user details</h1>
          </Link>
        </li>
        <li className="home-li">
          <Link to="/regi" className="active home-a">
            <button>Register</button>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Nav;
