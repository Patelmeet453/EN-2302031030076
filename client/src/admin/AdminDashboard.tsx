import React, { useState, useEffect } from "react";
import AdminProductDashboard from "./AdminProductDashboard";
import AdminOrders from "./Orders";
import AdminCustomerDashboard from "./AdminCustomerDashboard";
import { getCustomers, getProducts, getAllOrders } from "../api";

const AdminDashboard = () => {
  const [tab, setTab] = useState("overview");
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAdmins: 0,
    totalProducts: 0,
    totalRevenue: 0,
  });

  const fetchStats = async () => {
    try {
      const [customersRes, productsRes, ordersRes] = await Promise.all([
        getCustomers(),
        getProducts(),
        getAllOrders(),
      ]);

      const customers = customersRes.data || [];
      const products = productsRes.data || [];
      const orders = ordersRes.data.orders || [];

      const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
      const totalAdmins = customers.filter((c: any) => c.isAdmin).length;

      setStats({
        totalUsers: customers.length,
        totalAdmins,
        totalProducts: products.length,
        totalRevenue,
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <div className="bg-gray-800 text-white p-4 flex justify-center flex-wrap gap-6">
        <button
          onClick={() => setTab("overview")}
          className={`px-4 py-2 rounded-lg transition ${
            tab === "overview" ? "bg-white text-gray-900 font-bold" : "hover:bg-gray-700"
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setTab("products")}
          className={`px-4 py-2 rounded-lg transition ${
            tab === "products" ? "bg-white text-gray-900 font-bold" : "hover:bg-gray-700"
          }`}
        >
          Products
        </button>
        <button
          onClick={() => setTab("customers")}
          className={`px-4 py-2 rounded-lg transition ${
            tab === "customers" ? "bg-white text-gray-900 font-bold" : "hover:bg-gray-700"
          }`}
        >
          Customers
        </button>
        <button
          onClick={() => setTab("orders")}
          className={`px-4 py-2 rounded-lg transition ${
            tab === "orders" ? "bg-white text-gray-900 font-bold" : "hover:bg-gray-700"
          }`}
        >
          Orders
        </button>
      </div>

      {/* Dashboard Content */}
      <div className="p-6">
        {tab === "overview" && (
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Admin Dashboard Overview
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div
                onClick={() => setTab("customers")}
                className="cursor-pointer bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-2xl transition"
              >
                <h3 className="text-2xl font-bold text-gray-800">{stats.totalUsers}</h3>
                <p className="text-gray-500 mt-2">Total Users</p>
              </div>
              <div
                onClick={() => setTab("customers")}
                className="cursor-pointer bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-2xl transition"
              >
                <h3 className="text-2xl font-bold text-gray-800">{stats.totalAdmins}</h3>
                <p className="text-gray-500 mt-2">Admins</p>
              </div>
              <div
                onClick={() => setTab("products")}
                className="cursor-pointer bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-2xl transition"
              >
                <h3 className="text-2xl font-bold text-gray-800">{stats.totalProducts}</h3>
                <p className="text-gray-500 mt-2">Products</p>
              </div>
              <div
                onClick={() => setTab("orders")}
                className="cursor-pointer bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-2xl transition"
              >
                <h3 className="text-2xl font-bold text-gray-800">
                  ₹{stats.totalRevenue.toLocaleString()}
                </h3>
                <p className="text-gray-500 mt-2">Total Revenue</p>
              </div>
            </div>
          </div>
        )}

        {tab === "products" && <AdminProductDashboard />}
        {tab === "customers" && <AdminCustomerDashboard />}
        {tab === "orders" && <AdminOrders />}
      </div>
    </div>
  );
};

export default AdminDashboard;
