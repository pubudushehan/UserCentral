import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function User(props) {
  const { _id, name, gmail, age, address } = props.user;

  const history = useNavigate();
  const deleteHandler = async () => {
    await axios
      .delete(`http://localhost:5000/users/${_id}`)
      .then((res) => res.data)
      .then(() => history("/"))
      .then(() => history("/userdetails"));
  };

  return (
    <div>
      <h1>User Display</h1>
      <br></br>
      <h1>ID:{_id}</h1>
      <h1>Name:{name}</h1>
      <h1>Gmail:{gmail}</h1>
      <h1>Age:{age}</h1>
      <h1>Address:{address}</h1>
      <Link to={`/userdetails/${_id}`}>
        <button>Update</button>
      </Link>
      <button onClick={deleteHandler}>Delete</button>
    </div>
  );
}

export default User;
