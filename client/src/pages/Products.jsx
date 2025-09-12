// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { getProducts } from "../api";

// const Products = () => {
//   const [products, setProducts] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("All");

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await getProducts();
//         setProducts(res.data);
//       } catch (err) {
//         console.error("Error fetching products:", err);
//       }
//     };
//     fetchProducts();
//   }, []);

//   const categories = ["All", ...new Set(products.map((p) => p.category))];

//   const filteredProducts =
//     selectedCategory === "All"
//       ? products
//       : products.filter((p) => p.category === selectedCategory);

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
//         Our Products
//       </h2>

//       {/* Category Filter */}
//       <div className="flex justify-center mb-10 gap-3 flex-wrap">
//         {categories.map((cat) => (
//           <button
//             key={cat}
//             onClick={() => setSelectedCategory(cat)}
//             className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
//               selectedCategory === cat
//                 ? "bg-blue-600 text-white shadow-lg"
//                 : "bg-white text-gray-700 hover:bg-gray-100 hover:shadow-md"
//             }`}
//           >
//             {cat}
//           </button>
//         ))}
//       </div>

//       {/* Product Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
//         {filteredProducts.map((product) => (
//           <div
//             key={product._id}
//             className="bg-white rounded-3xl shadow-lg p-5 flex flex-col items-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
//           >
//             <div className="w-48 h-48 mb-4 flex items-center justify-center overflow-hidden rounded-2xl">
//               <img
//                 src={product.image}
//                 alt={product.name}
//                 className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
//               />
//             </div>
//             <h3 className="text-xl font-semibold mb-2 text-gray-800 text-center">
//               {product.name.length > 20
//                 ? product.name.slice(0, 20) + "..."
//                 : product.name}
//             </h3>
//             <p className="text-lg font-bold mb-4 text-gray-900">
//               ₹{product.price}
//             </p>
//             <Link
//               to={`/product/${product._id}`}
//               className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition shadow-md"
//             >
//               View Details
//             </Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Products;


import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../api";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [listening, setListening] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts();
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []); 

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  // Voice Search
  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("❌ Your browser does not support voice search.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN"; // Change to hi-IN for Hindi if needed
    recognition.interimResults = false;

    recognition.start();
    setListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
      setListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setListening(false);
    };

    recognition.onend = () => setListening(false);
  };

  // Filter logic
  const filteredProducts = products.filter((p) => {
    const matchCategory =
      selectedCategory === "All" || p.category === selectedCategory;
    const matchSearch =
      searchQuery === "" ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
        Our Products
      </h2>

      {/* Search + Voice */}
      <div className="flex justify-center gap-3 mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border px-4 py-2 rounded-lg w-72 focus:ring-2 focus:ring-blue-400 outline-none"
        />
        <button
          onClick={startListening}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {listening ? "🎙️ Listening..." : "🎤 Voice"}
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex justify-center mb-10 gap-3 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedCategory === cat
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-100 hover:shadow-md"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-3xl shadow-lg p-5 flex flex-col items-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="w-48 h-48 mb-4 flex items-center justify-center overflow-hidden rounded-2xl">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 text-center">
                {product.name.length > 20
                  ? product.name.slice(0, 20) + "..."
                  : product.name}
              </h3>
              <p className="text-lg font-bold mb-4 text-gray-900">
                ₹{product.price}
              </p>
              <Link
                to={`/product/${product._id}`}
                className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition shadow-md"
              >
                View Details
              </Link>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No products found
          </p>
        )}
      </div>
    </div>
  );
};

export default Products;
