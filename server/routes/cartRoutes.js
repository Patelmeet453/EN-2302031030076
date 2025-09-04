const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getCart,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} = require("../controllers/cartController");

router.get("/", protect, getCart);
router.post("/add", protect, addToCart);
router.post("/remove", protect, removeFromCart);
router.post("/update", protect, updateQuantity);
router.delete("/clear", protect, clearCart);
module.exports = router;
