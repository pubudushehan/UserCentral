const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  gmail: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model(
  "UserModel", // file name
  UserSchema //function name
);
