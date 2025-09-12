  import React, { useEffect, useState } from "react";
  import { getCart, removeFromCart, updateCartQuantity } from "../api";
  import { toast } from "react-toastify";
  import { useNavigate } from "react-router-dom";

  const Cart = () => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
      const fetchCart = async () => {
        try {
          const res = await getCart();
          setCart(res.data?.items || []);
        } catch (err) {
          console.error(err);
          toast.error("Failed to fetch cart");
        } finally {
          setLoading(false);
        }
      };
      fetchCart();
    }, []);

    // const handleRemove = async (productId) => {
    //   try {
    //     const res = await removeFromCart(productId);
    //     setCart(res.data?.items || []);
    //     toast.success("Item removed from cart");
    //   } catch (err) {
    //     console.error(err);
    //     toast.error("Failed to remove item");
    //   }
    // };

    const handleRemove = async (productId) => {
    // Remove locally first
    const updatedCart = cart.filter((item) => item.product._id !== productId);
    setCart(updatedCart);

    // Sync with API
    try {
      await removeFromCart(productId);
      toast.success("Item removed");
    } catch {
      toast.error("Failed to remove item");
    }
  };

    // const handleQuantityChange = async (productId, quantity) => {
    //   if (quantity < 1) return;
    //   try {
    //     const res = await updateCartQuantity(productId, quantity);
    //     setCart(res.data?.items || []);
    //   } catch (err) {
    //     console.error(err);
    //     toast.error("Failed to update quantity");
    //   }
    // };

  //   const handleQuantityChange = async (productId, quantity) => {
  //   if (quantity < 1) return;

  //   // Update cart locally first (instant feedback)
  //   const updatedCart = cart.map((item) =>
  //     item.product._id === productId ? { ...item, quantity } : item
  //   );
  //   setCart(updatedCart);

  //   // Sync with API
  //   try {
  //     await updateCartQuantity(productId, quantity);
  //   } catch {
  //     toast.error("Failed to update quantity");
  //   }
  // }

  const handleQuantityChange = async (productId, quantity) => {
  if (quantity < 1) return;

  const productInCart = cart.find((item) => item.product._id === productId);

  // ✅ Check stock before updating
  if (quantity > (productInCart?.product?.quantity || 1)) {
    toast.error("🚫 Not enough stock available");
    return;
  }

  // Update cart locally first (instant feedback)
  const updatedCart = cart.map((item) =>
    item.product._id === productId ? { ...item, quantity } : item
  );
  setCart(updatedCart);

  // Sync with API
  try {
    await updateCartQuantity(productId, quantity);
  } catch {
    toast.error("Failed to update quantity");
  }
};


    const totalPrice = (cart || []).reduce((acc, item) => {
      const price = item?.product?.price || 0;
      const quantity = item?.quantity || 0;
      return acc + price * quantity;
    }, 0);

    if (loading)
      return <p className="p-6 text-center text-xl text-gray-500">Loading Cart...</p>;

    if (!cart || cart.length === 0)
      return <p className="p-6 text-center text-xl text-gray-500">Your cart is empty.</p>;

    // Calculate GST (18%)
const gstAmount = Math.round(totalPrice * 0.18);

// Shipping (free above 999 else 50)
const shippingCharge = totalPrice > 999 ? 0 : 50;

// Final Payable
const finalAmount = totalPrice + gstAmount + shippingCharge;

    return (
      <div className="p-4 sm:p-6 max-w-6xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 text-center sm:text-left">
          Your Shopping Cart
        </h1>

        {/* Cart Items */}
        <div className="space-y-6">
          {cart.map((item, idx) => (
            <div
              key={item?.product?._id || idx}
              className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 p-5 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              {/* Product Image */}
              <img
                src={item?.product?.image || "/default.png"}
                alt={item?.product?.name || "Product"}
                className="w-full sm:w-28 h-40 sm:h-28 object-contain rounded-xl border border-gray-200"
              />

              {/* Product Info */}
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                  {item?.product?.name || "Unknown Product"}
                </h2>
                <p className="text-base sm:text-lg text-gray-600 mt-1">
                  ₹{item?.product?.price || 0}
                </p>

                {/* Quantity Controls */}
                <div className="flex justify-center sm:justify-start items-center gap-3 mt-4">
                  <button
                    className="px-3 py-1.5 bg-gray-200 hover:bg-gray-300 text-lg rounded-lg"
                    onClick={() =>
                      handleQuantityChange(item?.product?._id, (item?.quantity || 1) - 1)
                    }
                  >
                    −
                  </button>
                  <span className="px-4 py-1.5 bg-gray-100 text-lg rounded-lg border">
                    {item?.quantity || 0}
                  </span>
                  <button
                    className="px-3 py-1.5 bg-gray-200 hover:bg-gray-300 text-lg rounded-lg"
                    onClick={() =>
                      handleQuantityChange(item?.product?._id, (item?.quantity || 0) + 1)
                    }
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Price & Remove */}
              <div className="flex flex-col items-center sm:items-end">
                <p className="text-lg font-semibold text-gray-800">
                  ₹{((item?.product?.price || 0) * (item?.quantity || 0)).toLocaleString()}
                </p>
                <button
                  onClick={() => handleRemove(item?.product?._id)}
                  className="mt-3 text-red-500 hover:text-red-600 font-semibold transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
       <div className="mt-10 p-6 bg-gray-50 rounded-2xl shadow-inner">
  <div className="flex justify-between text-lg font-semibold">
    <span>Subtotal</span>
    <span>₹{totalPrice.toLocaleString()}</span>
  </div>

  <div className="flex justify-between text-base text-gray-600 mt-2">
    <span>Shipping</span>
    <span>₹{shippingCharge}</span>
  </div>

  <div className="flex justify-between text-base text-gray-600 mt-1">
    <span>GST (18%)</span>
    <span>₹{gstAmount.toLocaleString()}</span>
  </div>

  <hr className="my-4" />

  <div className="flex justify-between text-xl font-bold">
    <span>Total Payable</span>
    <span>₹{finalAmount.toLocaleString()}</span>
  </div>

  <button
    onClick={() => navigate("/checkout", { state: { finalAmount } })}
    className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-lg font-semibold shadow-md transition"
  >
    Proceed to Checkout
  </button>
</div>


      </div>
    );
  };

  export default Cart;
