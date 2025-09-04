import React, { useState } from "react";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userData = JSON.parse(localStorage.getItem("userData"));
  const isAdmin = userData?.isAdmin;
  const { totalItems } = useCart();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    navigate("/login");
  };

  return (
    <header className="w-full shadow-md bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-gray-800">
          ShopEase
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 text-gray-700 font-medium items-center">
          {!isAdmin && (
            <>
              <Link to="/">Home</Link>
              <Link to="/products">Products</Link>
              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/my-orders">My Order</Link>
            </>
          )}

          {isAdmin && (
            <>
              <Link to="/admin-product-dashboard">AddProduct</Link>
              <Link to="/admin-manage-customers">Manage Customers</Link>
              <Link to="/admin-manage-orders">Manage Orders</Link>
            </>
          )}
          {token ? (
            <button
              onClick={handleLogout}
              className="text-white hover:bg-blue-700 transition bg-blue-600 px-4 py-1 rounded-lg cursor-pointer"
            >
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button className="text-white hover:bg-blue-700 transition bg-blue-600 px-4 py-1 rounded-lg cursor-pointer">
                Login
              </button>
            </Link>
          )}
        </nav>

        {/* Cart & Profile Icons */}
        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative">
            <ShoppingCart size={24} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5">
                {totalItems}
              </span>
            )}
          </Link>
          <Link to="/profile">
            <User size={24} />
          </Link>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-white shadow-md px-4 py-4 flex flex-col gap-3">
          {!isAdmin && (
            <>
              <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
              <Link to="/products" onClick={() => setMobileMenuOpen(false)}>
                Products
              </Link>
              <Link to="/about" onClick={() => setMobileMenuOpen(false)}>
                About
              </Link>
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
                Contact
              </Link>
              <Link to="/my-orders" onClick={() => setMobileMenuOpen(false)}>
                My Order
              </Link>
            </>
          )}
          {isAdmin && (
            <>
              <Link
                to="/admin-product-dashboard"
                onClick={() => setMobileMenuOpen(false)}
              >
                AddProduct
              </Link>
              <Link to="/admin-orders" onClick={() => setMobileMenuOpen(false)}>
                AdminOrders
              </Link>
              <Link to="/admin-manage-customers" onClick={() => setMobileMenuOpen(false)}>
                Manage Customers
              </Link>
              <Link to="/admin-manage-orders" onClick={() => setMobileMenuOpen(false)}>
                Manage Orders
              </Link>
            </>
          )}
          {token ? (
            <button
              onClick={() => {
                handleLogout();
                setMobileMenuOpen(false);
              }}
              className="text-white hover:bg-blue-700 transition bg-blue-600 px-4 py-1 rounded-lg cursor-pointer"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
              <button className="text-white hover:bg-blue-700 transition bg-blue-600 px-4 py-1 rounded-lg cursor-pointer">
                Login
              </button>
            </Link>
          )}
        </nav>
      )}
    </header>
  );
};

export default Header;
