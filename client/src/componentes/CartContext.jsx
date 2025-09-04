import React, { createContext, useContext, useState, useEffect } from "react";
import { getCart, removeFromCart, updateCartQuantity } from "../api"; // adjust path

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // In CartContext
const clearCart = () => {
  setCart([]);
}

  // Fetch cart when app starts
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await getCart();
        setCart(res.data?.items || []);
      } catch (err) {
        console.error("Cart fetch failed", err);
      }
    };
    fetchCart();
  }, []);

  // Add functions to update cart dynamically
  const handleQuantityChange = async (productId, quantity) => {
    if (quantity < 1) return;

    const updatedCart = cart.map((item) =>
      item.product._id === productId ? { ...item, quantity } : item
    );
    setCart(updatedCart);

    try {
      await updateCartQuantity(productId, quantity);
    } catch (err) {
      console.error("Failed to update quantity", err);
    }
  };

  const handleRemove = async (productId) => {
    const updatedCart = cart.filter((item) => item.product._id !== productId);
    setCart(updatedCart);

    try {
      await removeFromCart(productId);
    } catch (err) {
      console.error("Failed to remove item", err);
    }
  };

  // Total item count
  const totalItems = cart.reduce((acc, item) => acc + (item.quantity || 0), 0);

  // Total price
  const totalPrice = cart.reduce(
    (acc, item) => acc + (item.product?.price || 0) * (item.quantity || 0),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        totalItems,
        totalPrice,
        handleQuantityChange,
        handleRemove,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
