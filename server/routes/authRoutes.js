const express = require("express");
const { registerUser, loginUser, getProfile, updateProfile } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// Profile routes
router.get("/profile", protect, getProfile);    // fetch current user
router.put("/profile", protect, updateProfile); // update user data

module.exports = router;
