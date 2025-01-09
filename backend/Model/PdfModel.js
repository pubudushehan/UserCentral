const mongoose = require("mongoose");

// Define schema for PDF documents
const pdfSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // Title of the PDF is mandatory
  },
  pdf: {
    type: String,
    required: true, // PDF filename is mandatory
  },
});

// Export the model for use in other files
module.exports = mongoose.model("pdfDetails", pdfSchema);
