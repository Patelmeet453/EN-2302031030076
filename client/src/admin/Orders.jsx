import React, { useEffect, useState } from "react";
import { getAllOrders, updateOrderStatus } from "../api";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await getAllOrders();
    setOrders(res.data.orders || []);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await updateOrderStatus(id, status);
      fetchOrders(); // reload updated orders
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Manage Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-600 text-center mt-10">No orders available</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="border rounded-lg p-4 mb-6 shadow-md bg-white hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="font-semibold text-gray-700">
                  Order ID: {order._id}
                </p>
                <p className="text-gray-600">User: {order.user?.name}</p>
                <p className="text-gray-600">Total: ₹{order.totalAmount}</p>
                <p className="text-gray-600">Status: {order.status}</p>
              </div>
              <select
                value={order.status}
                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                className="border rounded px-3 py-1 bg-white text-gray-700"
              >
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            {/* Products List */}
            <div className="mt-3">
              <h3 className="font-semibold mb-2 text-gray-700">Products:</h3>
              {order.items.map((item, idx) => (
                <div
                  key={item.product?._id || idx}
                  className="flex items-center mb-3 space-x-3"
                >
                  <img
                    src={item.product?.image || "/placeholder.png"}
                    alt={item.product?.name || "Deleted product"}
                    className="w-12 h-12 object-cover rounded border"
                  />
                  <div className="text-gray-700 text-sm">
                    <p className="font-medium">
                      {item.product?.name || "Deleted product"}
                    </p>
                    <p>Qty: {item.quantity}</p>
                    <p>Price: ₹{item.product?.price || 0}</p>
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

export default AdminOrders;
