const mongoose = require("mongoose");

// Define the schema for user registration
const RegiSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Name field is mandatory
  },
  gmail: {
    type: String,
    required: true, // Email field is mandatory
  },
  password: {
    type: String,
    required: true, // Password field is mandatory
  },
});

// Export the model for use in other files
module.exports = mongoose.model("Register", RegiSchema);
