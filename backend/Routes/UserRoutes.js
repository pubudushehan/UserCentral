const express = require("express");
const router = express.Router();
const UserController = require("../Controllers/UserControl");
const User = require("../Model/UserModel");

// GET all users
router.get("/", UserController.getAllUsers);

// GET single user
router.get("/:id", UserController.getUserById);

// CREATE new user
router.post("/", UserController.addUser);

// UPDATE user
router.put("/:id", UserController.updateUser);

// DELETE user
router.delete("/:id", UserController.deleteUser);

module.exports = router;
