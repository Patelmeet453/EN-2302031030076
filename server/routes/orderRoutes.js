const express = require("express");
const {
  createOrder,
  verifyPayment,
  getMyOrders,
  getOrders,
  updateOrderStatus,
} = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// User routes
router.post("/create-order", protect, createOrder); // ✅ Place a new order
router.post("/verify-payment", protect, verifyPayment); // ✅ Verify Razorpay payment
router.get("/my-orders", protect, getMyOrders); // ✅ Get logged-in user's orders

// Admin routes
router.get("/all", protect, getOrders); // ✅ Get all orders (Admin)
router.put("/:id", protect, updateOrderStatus); // ✅ Update order status (Admin)

module.exports = router;
