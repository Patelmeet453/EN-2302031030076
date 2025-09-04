const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Get Cart
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
    if (!cart) return res.json({ items: [] });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add or update product in cart
exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [] });
    }

    const index = cart.items.findIndex((item) => item.product.toString() === productId);
    if (index > -1) {
      cart.items[index].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    const updatedCart = await cart.populate("items.product");
    res.json(updatedCart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Remove product from cart
exports.removeFromCart = async (req, res) => {
  const { productId } = req.body;
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter((item) => item.product.toString() !== productId);
    await cart.save();
    const updatedCart = await cart.populate("items.product");
    res.json(updatedCart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update quantity
exports.updateQuantity = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find((item) => item.product.toString() === productId);
    if (item) item.quantity = quantity;
    await cart.save();

    const updatedCart = await cart.populate("items.product");
    res.json(updatedCart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ✅ Clear entire cart
exports.clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = []; // Empty the cart
    await cart.save();

    res.json({ message: "Cart cleared successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};