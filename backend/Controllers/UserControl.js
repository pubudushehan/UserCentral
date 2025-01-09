const User = require("../Model/UserModel");

// GET all users from the database
const getAllUsers = async (req, res, next) => {
  let users;
  try {
    // Find all users in the database
    users = await User.find();
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error fetching users", error: err });
  }

  // If no users found, return 404
  if (!users) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(200).json({ users });
};

// GET a single user by their ID
const getUserById = async (req, res, next) => {
  const id = req.params.id;
  try {
    // Find user by ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (err) {
    return res.status(500).json({ message: "Error fetching user", error: err });
  }
};

// CREATE a new user
const addUser = async (req, res, next) => {
  const { name, gmail, age, address } = req.body;

  try {
    // Create new user instance
    const newUser = new User({
      name,
      gmail,
      age,
      address,
    });

    // Save user to database
    await newUser.save();
    return res.status(201).json({ user: newUser });
  } catch (err) {
    return res.status(500).json({ message: "Error creating user", error: err });
  }
};

// UPDATE existing user
const updateUser = async (req, res, next) => {
  const id = req.params.id;
  const { name, gmail, age, address } = req.body;

  try {
    // Find and update user
    const user = await User.findByIdAndUpdate(
      id,
      { name, gmail, age, address },
      { new: true } // Returns the updated document
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (err) {
    return res.status(500).json({ message: "Error updating user", error: err });
  }
};

// DELETE user
const deleteUser = async (req, res, next) => {
  const id = req.params.id;

  try {
    // Check if ID is valid
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid user ID format",
      });
    }

    // Find and delete user
    const user = await User.findByIdAndDelete(id);

    // If user not found
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    // Success response
    return res.status(200).json({
      status: "success",
      message: "User successfully deleted",
    });
  } catch (err) {
    console.error("Error in deleteUser:", err);
    return res.status(500).json({
      status: "error",
      message: "Error deleting user",
      error: err.message,
    });
  }
};

// Export all controller functions
exports.getAllUsers = getAllUsers;
exports.getUserById = getUserById;
exports.addUser = addUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
