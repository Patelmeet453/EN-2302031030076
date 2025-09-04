import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-lg font-bold mb-4">ShopEase</h2>
          <p>Your one-stop shop for everything you love.</p>
        </div>
        <div>
          <h2 className="text-lg font-bold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-bold mb-4">Contact</h2>
          <p>Email: support@shopease.com</p>
          <p>Phone: +1 (234) 567-890</p>
        </div>
      </div>
      <p className="text-center text-gray-500 mt-6">
        © 2025 ShopEase. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
