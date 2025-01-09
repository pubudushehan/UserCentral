const mongoose = require("mongoose");

// Define schema for Image uploads
const imgSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // Title of the image is mandatory
  },
  image: {
    type: String,
    required: true, // Image filename is mandatory
  },
});

// Export the model for use in other files
module.exports = mongoose.model("ImgModel", imgSchema);
