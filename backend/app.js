// Import required dependencies
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Register = require("./Model/Register");
const PdfSchema = require("./Model/PdfModel");
const router = require("./Routes/UserRoutes");

const app = express();

// Middleware setup
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable Cross-Origin Resource Sharing

// Serve static files and set up routes
app.use("/files", express.static("files")); // Serve files from 'files' directory
app.use("/users", router); // Use user routes

// MongoDB Connection Setup
mongoose
  .connect("mongodb+srv://admin:7vhqI6hJjogzQfrb@cluster0.gygec.mongodb.net/")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Add error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: "error",
    message: "Something went wrong!",
    error: err.message,
  });
});

// User Registration endpoint
app.post("/register", async (req, res) => {
  const { name, gmail, password } = req.body;
  try {
    await Register.create({
      name,
      gmail,
      password,
    });
    res.send({ status: "ok" });
  } catch (err) {
    res.send({ status: "error", error: err });
  }
});

// User Login endpoint
app.post("/login", async (req, res) => {
  const { gmail, password } = req.body;
  try {
    const user = await Register.findOne({ gmail });
    if (!user) {
      return res.json({ status: "error", err: "User Not Found" });
    }
    if (user.password === password) {
      return res.json({ status: "ok" });
    } else {
      return res.json({ status: "error", err: "Incorrect Password" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", err: "Server Error" });
  }
});

// PDF Upload Configuration
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files"); // Set file destination
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + "-" + file.originalname); // Create unique filename
  },
});

// Initialize PDF model and multer upload
require("./Model/PdfModel");
const pdfSchema = mongoose.model("pdfDetails");
const upload = multer({ storage });

// PDF Upload endpoint
app.post("/uploadfile", upload.single("file"), async (req, res) => {
  console.log(res.file);
  const title = req.body.title;
  const pdf = req.file.filename;
  try {
    await PdfSchema.create({ title: title, pdf: pdf });
    console.log("PDF uploaded successfully");
    res.send({ status: 200 });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "error" });
  }
});

// Get all PDFs endpoint
app.get("/getFile", async (req, res) => {
  try {
    const data = await pdfSchema.find({});
    res.send({ status: 200, data: data });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "error" });
  }
});

// Image Upload Configuration
require("./Model/ImgModel");
const ImgSchema = mongoose.model("ImgModel");
const multerimg = require("multer");

// Create files directory if it doesn't exist
const fs = require("fs");
if (!fs.existsSync("./files")) {
  fs.mkdirSync("./files");
}

// Configure image storage
const storageimg = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

// Configure image upload with file type validation
const UploadImg = multerimg({
  storage: storageimg,
  fileFilter: function (req, file, cb) {
    // Only allow image files
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Not an image! Please upload an image."), false);
    }
  },
});

// Image Upload endpoint
app.post("/uploadImage", UploadImg.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .send({ status: "error", message: "No file uploaded" });
    }

    const title = req.body.title;
    const image = req.file.filename;

    await ImgSchema.create({ title: title, image: image });
    console.log("Image uploaded successfully");
    res.send({ status: "ok" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "error", message: err.message });
  }
});

// Get all images endpoint
app.get("/getImage", async (req, res) => {
  try {
    const data = await ImgSchema.find({});
    res.send({ status: "ok", images: data });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "error" });
  }
});

// Delete PDF endpoint
app.delete("/deletefile/:id", async (req, res) => {
  try {
    const pdf = await PdfSchema.findById(req.params.id);
    if (!pdf) {
      return res
        .status(404)
        .json({ status: "error", message: "PDF not found" });
    }

    // Delete file from filesystem
    const filePath = `./files/${pdf.pdf}`; // Use the pdf field from your schema
    fs.unlink(filePath, async (err) => {
      if (err) {
        console.error("Error deleting file:", err);
        return res
          .status(500)
          .json({ status: "error", message: "Error deleting file" });
      }

      // Delete from database
      await pdf.deleteOne();
      res.json({ status: "ok", message: "PDF deleted successfully" });
    });
  } catch (error) {
    console.error("Error in delete endpoint:", error);
    res.status(500).json({ status: "error", message: "Server error" });
  }
});
