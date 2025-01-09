const express = require("express");
const router = express.Router();
const UserController = require("../Controllers/UserControl");

// Define routes for user operations
// GET all users
router.get("/", UserController.getAllUsers);

// GET single user by ID
router.get("/:id", UserController.getUserById);

// CREATE new user
router.post("/", UserController.addUser);

// UPDATE existing user
router.put("/:id", UserController.updateUser);

// DELETE user
router.delete("/:id", UserController.deleteUser);

// Export router for use in app.js
module.exports = router;
