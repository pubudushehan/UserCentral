import React from "react";
import { Route, Routes } from "react-router";
import "./App.css";

// Import all components
import Home from "./Components/Home/Home";
import AddUser from "./Components/AddUser/AddUser";
import UserDetails from "./Components/UserDetails/Users";
import UpdateUser from "./Components/UpdateUser/UpdateUser";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import CantactUs from "./Components/CantactUs/CantactUs";
import SendPdf from "./Components/SendPdf/files/SendPdf";
import ImgUploader from "./Components/ImgUploader/ImgUploader";
import Footer from "./Components/Footer/Footer";

function App() {
  return (
    <div className="app">
      <React.Fragment>
        {/* Define application routes */}
        <Routes>
          <Route path="/" element={<Home />} /> {/* Default route */}
          <Route path="/mainhome" element={<Home />} /> {/* Home page */}
          <Route path="/adduser" element={<AddUser />} /> {/* Add new user */}
          <Route path="/userdetails" element={<UserDetails />} />{" "}
          {/* List users */}
          <Route path="/userdetails/:id" element={<UpdateUser />} />{" "}
          {/* Edit user */}
          <Route path="/regi" element={<Register />} />{" "}
          {/* User registration */}
          <Route path="/log" element={<Login />} /> {/* User login */}
          <Route path="/cantactus" element={<CantactUs />} />{" "}
          {/* Contact form */}
          <Route path="/sendpdf" element={<SendPdf />} /> {/* PDF upload */}
          <Route path="/upload-image" element={<ImgUploader />} />{" "}
          {/* Image upload */}
        </Routes>
        <Footer />
      </React.Fragment>
    </div>
  );
}

export default App;
