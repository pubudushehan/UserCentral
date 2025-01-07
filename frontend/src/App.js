import React from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./Components/Home/Home";
import AddUser from "./Components/AddUser/AddUser";
import UserDetails from "./Components/UserDetails/Users";
import UpdateUser from "./Components/UpdateUser/UpdateUser";

function App() {
  //type javascript
  return (
    <div>
      <React.Fragment>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mainhome" element={<Home />} />
          <Route path="/adduser" element={<AddUser />} />
          <Route path="/userdetails" element={<UserDetails />} />
          <Route path="/userdetails/:id" element={<UpdateUser />} />
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
