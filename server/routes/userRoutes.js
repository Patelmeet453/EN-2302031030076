// routes/userRoutes.js
const express = require("express");
const User = require("../models/User"); // adjust path if needed
const router = express.Router();

// GET all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// ADD a user
// ADD a user
router.post("/", async (req, res) => {
  try {
    const { name, email, password, address, isAdmin, image } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({
      name,
      email,
      password,
      address,
      isAdmin,
      image,
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    console.error("Error adding user:", err);
    res.status(500).json({ message: "Failed to add user", error: err.message });
  }
});


// UPDATE a user
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Failed to update user" });
  }
});

// DELETE a user
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete user" });
  }
});

module.exports = router;
