const User = require("../Model/UserModel");

// GET all users
const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error fetching users", error: err });
  }

  if (!users) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(200).json({ users });
};

// GET single user by ID
const getUserById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (err) {
    return res.status(500).json({ message: "Error fetching user", error: err });
  }
};

// CREATE new user
const addUser = async (req, res, next) => {
  const { name, gmail, age, address } = req.body;

  let newUser;

  try {
    newUser = new User({ name, gmail, age, address });
    await newUser.save();
    return res.status(201).json({ user: newUser });
  } catch (err) {
    return res.status(500).json({ message: "Error creating user", error: err });
  }
};

// UPDATE user
const updateUser = async (req, res, next) => {
  const id = req.params.id;
  const { name, gmail, age, address } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      id,
      {
        name,
        gmail,
        age,
        address,
      },
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
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User successfully deleted" });
  } catch (err) {
    return res.status(500).json({ message: "Error deleting user", error: err });
  }
};

exports.getAllUsers = getAllUsers;
exports.getUserById = getUserById;
exports.addUser = addUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
