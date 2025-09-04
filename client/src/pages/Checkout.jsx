import React, { useEffect, useState } from "react";
import { getCart, createOrder } from "../api";
import API from "../api";
import { toast } from "react-toastify";
import { useCart } from "../componentes/CartContext";
import { clearCart as clearCartAPI } from "../api";

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const { clearCart } = useCart();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await getCart();
        setCart(res.data?.items || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load cart");
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const totalPrice = cart.reduce(
    (acc, item) => acc + (item?.product?.price || 0) * (item?.quantity || 0),
    0
  );

  const handlePlaceOrder = async () => {
    try {
      if (!cart.length) {
        toast.error("Cart is empty");
        return;
      }

      const orderPayload = {
        totalAmount: finalAmount,
        items: cart.map((item) => ({
          product: item?.product?._id,
          quantity: item?.quantity,
        })),
        address,
        paymentMethod,
      };

      const res = await createOrder(orderPayload);
      const data = res.data;

      if (!data.success) {
        toast.error(data.message || "Order failed");
        return;
      }

      if (paymentMethod === "Razorpay") {
        const options = {
          // key: process.env.REACT_APP_RAZORPAY_KEY_ID, // must match your .env
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: data.razorpayOrder.amount,
          currency: "INR",
          name: "My Shop",
          description: "Order Payment",
          order_id: data.razorpayOrder.id,
          handler: async function (response) {
            await API.post("/orders/verify-payment", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId: data.orderId,
            });
            await clearCartAPI();
            toast.success("Payment successful!");
            window.location.href = "/my-orders";
          },
          prefill: { name: address.fullName, contact: address.phone },
          theme: { color: "#3399cc" },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        await clearCartAPI();
        toast.success("Order placed with Cash on Delivery!");
        window.location.href = "/my-orders";
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  if (loading) return <p className="p-6 text-center">Loading checkout...</p>;

  const subtotal = cart.reduce(
  (acc, item) => acc + (item?.product?.price || 0) * (item?.quantity || 0),
  0
);

const gstAmount = Math.round(subtotal * 0.18);
const shippingCharge = subtotal > 999 ? 0 : 50;
const finalAmount = subtotal + gstAmount + shippingCharge;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {/* Address Form */}
      <div className="mb-6 p-4 bg-white rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-3">Shipping Address</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {["fullName", "phone", "street", "city", "state", "pincode"].map(
            (field) => (
              <input
                key={field}
                type="text"
                placeholder={field.replace(/^\w/, (c) => c.toUpperCase())}
                value={address[field]}
                onChange={(e) =>
                  setAddress({ ...address, [field]: e.target.value })
                }
                className="border rounded p-2 w-full"
              />
            )
          )}
        </div>
      </div>

      {/* Order Summary */}
      {/* <div className="mb-6 p-4 bg-white rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-3">Order Summary</h2>
        {cart.map((item) => (
          <div
            key={item?.product?._id}
            className="flex justify-between border-b py-2"
          >
            <span>
              {item?.product?.name} x {item?.quantity}
            </span>
            <span>₹{item?.product?.price * item?.quantity}</span>
          </div>
        ))}
        <div className="flex justify-between mt-4 font-bold text-lg">
          <span>Total</span>
          <span>₹{totalPrice}</span>
        </div>
      </div> */}

      <div className="mb-6 p-4 bg-white rounded-xl shadow-md">
  <h2 className="text-xl font-semibold mb-3">Order Summary</h2>
  {cart.map((item) => (
    <div key={item.product._id} className="flex justify-between border-b py-2">
      <span>{item.product.name} x {item.quantity}</span>
      <span>₹{item.product.price * item.quantity}</span>
    </div>
  ))}

  <div className="flex justify-between mt-3">
    <span>Subtotal</span>
    <span>₹{subtotal}</span>
  </div>
  <div className="flex justify-between">
    <span>GST (18%)</span>
    <span>₹{gstAmount}</span>
  </div>
  <div className="flex justify-between">
    <span>Shipping</span>
    <span>₹{shippingCharge}</span>
  </div>

  <hr className="my-3" />
  <div className="flex justify-between text-lg font-bold">
    <span>Total Payable</span>
    <span>₹{finalAmount}</span>
  </div>
</div>

      {/* Payment Method */}
      <div className="mb-6 p-4 bg-white rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-3">Payment Method</h2>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="border rounded p-2 w-full"
        >
          <option value="COD">Cash on Delivery</option>
          <option value="Razorpay">Razorpay</option>
        </select>
      </div>

      <button
        onClick={handlePlaceOrder}
        className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold w-full"
      >
        Place Order
      </button>
    </div>
  );
};

export default Checkout;
