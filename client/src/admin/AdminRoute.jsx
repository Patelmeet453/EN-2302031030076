// src/components/AdminRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const userData = JSON.parse(localStorage.getItem("userData"));

  // If no token or user is not admin, redirect to home
  if (!token || !userData?.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
