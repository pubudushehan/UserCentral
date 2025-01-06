const express = require("express");
const mongoose = require("mongoose");
const router = require("./Routes/UserRoutes");
const cors = require("cors");

const app = express();

// Add these middleware before routes
app.use(express.json());
app.use(cors());
// routes middleware
app.use("/users", router);

mongoose
  .connect("mongodb+srv://admin:7vhqI6hJjogzQfrb@cluster0.gygec.mongodb.net/")
  .then(() => console.log("Connect to MongoDB"))
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
