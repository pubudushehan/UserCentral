import React from "react";

function User(props) {
  const { _id, name, gmail, age, address } = props.user;
  return (
    <div>
      <h1>User Display</h1>
      <br></br>
      <h1>ID:{_id}</h1>
      <h1>Name:{name}</h1>
      <h1>Gmail:{gmail}</h1>
      <h1>Age:{age}</h1>
      <h1>Address:{address}</h1>
      <button>Update</button>
      <button>Delete</button>
    </div>
  );
}

export default User;
