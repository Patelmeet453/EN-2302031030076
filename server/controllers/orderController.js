const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../models/Order");

// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Order
exports.createOrder = async (req, res) => {
  try {
    const userId = req.user.id; // ✅ Always available now
    const { items, address, totalAmount, paymentMethod } = req.body;

    if (!items?.length) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    const formattedAddress = {
      fullName: address.fullName,
      phone: address.phone,
      street: address.street,
      city: address.city,
      state: address.state,
      pincode: address.pincode,
    };

    const order = await Order.create({
      user: userId,
      items,
      address: formattedAddress,
      totalAmount,
      paymentMethod,
      status: paymentMethod === "COD" ? "Pending" : "Initiated",
    });

    if (paymentMethod === "Razorpay") {
      const razorpayOrder = await razorpay.orders.create({
        amount: totalAmount * 100,
        currency: "INR",
        receipt: `receipt_${order._id}`,
      });

      return res.status(201).json({
        success: true,
        razorpayOrder,
        orderId: order._id,
      });
    }

    res.status(201).json({
      success: true,
      message: "COD order placed successfully",
      order,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({
        success: false,
        message: err.message || "Order creation failed",
      });
  }
};

// Verify Razorpay Payment
exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid signature" });
    }

    await Order.findByIdAndUpdate(orderId, { status: "Paid" });

    res.json({ success: true, message: "Payment verified" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Payment verification failed" });
  }
};

// Get all orders (Admin)
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email").populate("items.product", "name image price");
    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get logged-in user's orders
exports.getMyOrders = async (req, res) => {
  try {
    const userId = req.user?.id || req.query.userId; // Adjusted for frontend
    const orders = await Order.find({ user: userId })
      .populate("items.product", "name price")
      .populate("items.product", "name image price");
    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update order status (Admin)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!order)
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });

    res.json({ success: true, message: "Status updated", order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
