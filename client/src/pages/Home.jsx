import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../api"; // Import API

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts();
        setProducts(res.data.slice(0, 4)); // Show only first 4
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center py-28 px-6 overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-white opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-white opacity-10 rounded-full translate-x-1/2 translate-y-1/2"></div>

        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
          Welcome to ShopEase
        </h1>
        <p className="mb-8 text-lg md:text-xl drop-shadow-md">
          Discover amazing products at unbeatable prices
        </p>
        <Link
          to="/products"
          className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-full shadow-lg hover:scale-105 transform transition"
        >
          Shop Now
        </Link>
      </div>

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
          Featured Products
        </h2>

        {products.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">Loading products...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-full h-56 rounded-t-3xl mb-4 flex items-center justify-center overflow-hidden">
                  <img
                    src={product.image || "https://via.placeholder.com/150"}
                    alt={product.name}
                    className="object-contain w-full h-full transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <div className="px-6 pb-6">
                  <h3 className="font-semibold text-gray-800 mb-2 text-lg">
                    {product.name}
                  </h3>
                  <p className="text-gray-500 mb-4 text-md font-medium">
                    ₹{product.price}
                  </p>
                  <Link
                    to={`/product/${product._id}`}
                    className="block bg-blue-600 text-white text-center py-2 rounded-full hover:bg-blue-700 transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="bg-blue-600 text-white text-center py-16 mt-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Start Your Shopping Journey Today!
        </h2>
        <p className="mb-6 max-w-2xl mx-auto text-lg">
          Explore hundreds of products across multiple categories and enjoy
          exclusive deals.
        </p>
        <Link
          to="/products"
          className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-full shadow-lg hover:scale-105 transform transition"
        >
          Browse Products
        </Link>
      </div>
    </section>
  );
};

export default Home;
