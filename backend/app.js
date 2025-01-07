const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Register = require("./Model/Register");
const router = require("./Routes/UserRoutes");

const app = express();

app.use(express.json());
app.use(cors());

// routes middleware
app.use("/users", router);

mongoose
  .connect("mongodb+srv://admin:7vhqI6hJjogzQfrb@cluster0.gygec.mongodb.net/")
  .then(() => console.log("Connected to MongoDB"))
  .then(() => {
    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((err) => {
    console.log(err);
  });

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
