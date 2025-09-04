const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
}, { _id: false });

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, required: true },
    },
  ],
  address: { type: addressSchema, required: true },
  totalAmount: { type: Number, required: true },
  status: { type: String, default: "Pending" }, // Pending, Paid, Shipped
  paymentMethod: { type: String, default: "COD" },
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
