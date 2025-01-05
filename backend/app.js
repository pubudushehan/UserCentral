const express = require("express");
const mongoose = require("mongoose");

const app = express();

//middleware
app.use("/", (req, res, next) => {
  res.send("It is working");
});

mongoose
  .connect("mongodb+srv://admin:7vhqI6hJjogzQfrb@cluster0.gygec.mongodb.net/")
  .then(() => console.log("Connect to MongoDB"))
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
