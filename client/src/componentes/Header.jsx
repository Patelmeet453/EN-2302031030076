// import React, { useState } from "react";
// import { ShoppingCart, User, Menu, X } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import { useCart } from "./CartContext";

// const Header = () => {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");
//   const userData = JSON.parse(localStorage.getItem("userData"));
//   const isAdmin = userData?.isAdmin;
//   const { totalItems } = useCart();

//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("userData");
//     navigate("/login");
//   };

//   return (
//     <header className="w-full shadow-md bg-white sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
//         {/* Logo */}
//         <Link to="/" className="text-2xl font-bold text-gray-800">
//           ShopEase
//         </Link>

//         {/* Desktop Nav */}
//         <nav className="hidden md:flex gap-6 text-gray-700 font-medium items-center">
//           {!isAdmin && (
//             <>
//               <Link to="/">Home</Link>
//               <Link to="/products">Products</Link>
//               <Link to="/about">About</Link>
//               <Link to="/contact">Contact</Link>
//               <Link to="/my-orders">My Order</Link>
//             </>
//           )}

//           {isAdmin && (
//             <>
//               <Link to="/admin-product-dashboard">AddProduct</Link>
//               <Link to="/admin-manage-customers">Manage Customers</Link>
//               <Link to="/admin-manage-orders">Manage Orders</Link>
//             </>
//           )}
//           {token ? (
//             <button
//               onClick={handleLogout}
//               className="text-white hover:bg-blue-700 transition bg-blue-600 px-4 py-1 rounded-lg cursor-pointer"
//             >
//               Logout
//             </button>
//           ) : (
//             <Link to="/login">
//               <button className="text-white hover:bg-blue-700 transition bg-blue-600 px-4 py-1 rounded-lg cursor-pointer">
//                 Login
//               </button>
//             </Link>
//           )}
//         </nav>

//         {/* Cart & Profile Icons */}
//         <div className="flex items-center gap-4">
//           <Link to="/cart" className="relative">
//             <ShoppingCart size={24} />
//             {totalItems > 0 && (
//               <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5">
//                 {totalItems}
//               </span>
//             )}
//           </Link>
//           <Link to="/profile">
//             <User size={24} />
//           </Link>

//           {/* Mobile Hamburger */}
//           <button
//             className="md:hidden"
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//           >
//             {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {mobileMenuOpen && (
//         <nav className="md:hidden bg-white shadow-md px-4 py-4 flex flex-col gap-3">
//           {!isAdmin && (
//             <>
//               <Link to="/" onClick={() => setMobileMenuOpen(false)}>
//                 Home
//               </Link>
//               <Link to="/products" onClick={() => setMobileMenuOpen(false)}>
//                 Products
//               </Link>
//               <Link to="/about" onClick={() => setMobileMenuOpen(false)}>
//                 About
//               </Link>
//               <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
//                 Contact
//               </Link>
//               <Link to="/my-orders" onClick={() => setMobileMenuOpen(false)}>
//                 My Order
//               </Link>
//             </>
//           )}
//           {isAdmin && (
//             <>
//               <Link
//                 to="/admin-product-dashboard"
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 AddProduct
//               </Link>
//               <Link to="/admin-orders" onClick={() => setMobileMenuOpen(false)}>
//                 AdminOrders
//               </Link>
//               <Link to="/admin-manage-customers" onClick={() => setMobileMenuOpen(false)}>
//                 Manage Customers
//               </Link>
//               <Link to="/admin-manage-orders" onClick={() => setMobileMenuOpen(false)}>
//                 Manage Orders
//               </Link>
//             </>
//           )}
//           {token ? (
//             <button
//               onClick={() => {
//                 handleLogout();
//                 setMobileMenuOpen(false);
//               }}
//               className="text-white hover:bg-blue-700 transition bg-blue-600 px-4 py-1 rounded-lg cursor-pointer"
//             >
//               Logout
//             </button>
//           ) : (
//             <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
//               <button className="text-white hover:bg-blue-700 transition bg-blue-600 px-4 py-1 rounded-lg cursor-pointer">
//                 Login
//               </button>
//             </Link>
//           )}
//         </nav>
//       )}
//     </header>
//   );
// };


import React, { useState } from "react";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "./CartContext";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const userToken = localStorage.getItem("userToken");
  const adminToken = sessionStorage.getItem("adminToken");
  const isAdmin = !!adminToken;

  const hideUserNav = location.pathname === "/admin-login";

  // Logout
  const handleUserLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userData");
    navigate("/login");
  };

  const handleAdminLogout = () => {
    sessionStorage.removeItem("adminToken");
    sessionStorage.removeItem("adminData");
    navigate("/admin-login");
  };

  // Nav links
  const userLinks = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Products" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
    { to: "/my-orders", label: "My Orders" },
  ];

  const adminLinks = [
    { to: "/admin-dashboard", label: "Dashboard" },
    { to: "/admin-product-dashboard", label: "Add Product" },
    { to: "/admin-manage-customers", label: "Manage Customers" },
    { to: "/admin-manage-orders", label: "Manage Orders" },
  ];

  const renderLinks = (links, onClick) =>
    links.map((link) => (
      <Link key={link.to} to={link.to} onClick={onClick}>
        {link.label}
      </Link>
    ));

  return (
    <header className="w-full shadow-md bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-gray-800">
          ShopEase
        </Link>

        {/* Desktop Nav */}
        <nav
          className={`hidden md:flex gap-6 text-gray-700 font-medium items-center ${
            !userToken ? "ms-auto" : "mx-auto"
          }`}
        >
          {/* Admin Links */}
          {isAdmin && renderLinks(adminLinks)}
          {/* User Links */}
          {!isAdmin && userToken && !hideUserNav && renderLinks(userLinks)}

          {/* Login/Logout buttons */}
          {!userToken && !adminToken && !hideUserNav && (
            <Link to="/login">
              <button className="text-white hover:bg-blue-700 transition bg-blue-600 px-4 py-1 rounded-lg cursor-pointer">
                Login
              </button>
            </Link>
          )}
          {userToken && !isAdmin && (
            <button
              onClick={handleUserLogout}
              className="text-white hover:bg-blue-700 transition bg-blue-600 px-4 py-1 rounded-lg cursor-pointer"
            >
              Logout
            </button>
          )}
          {adminToken && isAdmin && (
            <button
              onClick={handleAdminLogout}
              className="text-white hover:bg-blue-700 transition bg-blue-600 px-4 py-1 rounded-lg cursor-pointer"
            >
              Logout
            </button>
          )}
        </nav>

        {/* Cart & Profile Icons */}
        {!isAdmin && userToken && !hideUserNav && (
          <div className="hidden md:flex items-center gap-4 justify-end">
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
          </div>
        )}

        {/* Mobile Hamburger */}
        <button
          className="md:hidden ms-auto"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-white shadow-md px-4 py-4 flex flex-col gap-3">
          {/* Admin Links */}
          {isAdmin && renderLinks(adminLinks, () => setMobileMenuOpen(false))}
          {/* User Links */}
          {!isAdmin &&
            userToken &&
            !hideUserNav &&
            renderLinks(userLinks, () => setMobileMenuOpen(false))}
            
             {/* Cart & Profile Icons for Mobile */}
    {!isAdmin && userToken && !hideUserNav && (
      <div className="flex items-center gap-4 mt-2">
        <Link to="/cart" onClick={() => setMobileMenuOpen(false)} className="relative">
          <ShoppingCart size={24} />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5">
              {totalItems}
            </span>
          )}
        </Link>
        <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
          <User size={24} />
        </Link>
      </div>
    )}

          {/* Login/Logout */}
          {!userToken && !adminToken && !hideUserNav && (
            <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
              <button className="text-white hover:bg-blue-700 transition bg-blue-600 px-4 py-1 rounded-lg cursor-pointer">
                Login
              </button>
            </Link>
          )}
          {userToken && !isAdmin && (
            <button
              onClick={() => {
                handleUserLogout();
                setMobileMenuOpen(false);
              }}
              className="text-white hover:bg-blue-700 transition bg-blue-600 px-4 py-1 rounded-lg cursor-pointer"
            >
              Logout
            </button>
          )}
          {adminToken && isAdmin && (
            <button
              onClick={() => {
                handleAdminLogout();
                setMobileMenuOpen(false);
              }}
              className="text-white hover:bg-blue-700 transition bg-blue-600 px-4 py-1 rounded-lg cursor-pointer"
            >
              Logout
            </button>
          )}
        </nav>
      )}
    </header>
  );
};

export default Header;
