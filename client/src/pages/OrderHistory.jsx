import React, { useEffect, useState } from "react";
import { getMyOrders } from "../api";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const res = await getMyOrders(userId);
        setOrders(res.data.orders || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return <p className="text-center mt-6">Loading your orders...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          No orders available.
        </p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="border rounded-lg p-4 mb-4 shadow-sm bg-white"
          >
            <p className="font-semibold">Order ID: {order._id}</p>
            <p>Status: {order.status}</p>
            <p>Total: ₹{order.totalAmount}</p>

            <div className="mt-3 space-y-2">
              {order.items.map((item) => (
                <div key={item._id} className="flex items-center gap-4">
                  <img
                    src={item.product?.image || "/placeholder.png"}
                    alt={item.product?.name || "Product"}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium">{item.product?.name}</p>
                    <p>Qty: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;
