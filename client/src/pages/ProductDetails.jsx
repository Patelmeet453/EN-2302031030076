import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById, addToCart } from "../api";
import { toast } from "react-toastify";
import { Star } from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductById(id);
        setProduct(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product:", err);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await addToCart(product._id, 1); // default quantity 1
      toast.success("Product added to cart!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add product to cart. Please login.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] p-6">
        <h2 className="text-3xl font-bold mb-4">Loading Product...</h2>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-6">
        <h2 className="text-3xl font-bold mb-4">Product Not Found</h2>
        <Link
          to="/products"
          className="text-blue-500 underline text-lg hover:text-blue-700 transition"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  const shortDesc =
    product.description.length > 300
      ? product.description.slice(0, 300) + "..."
      : product.description;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row gap-10 bg-white rounded-3xl shadow-xl p-6 md:p-10 transition hover:shadow-2xl">
        <div className="md:w-1/2 flex justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full max-h-[450px] object-contain rounded-2xl shadow-md transition-transform hover:scale-105"
          />
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold mb-4 text-gray-900">
              {product.name}
            </h1>
            <p className="text-gray-700 text-lg md:text-xl mb-6 leading-relaxed">
              {showFullDesc ? product.description : shortDesc}
              {product.description.length > 300 && (
                <span
                  onClick={() => setShowFullDesc(!showFullDesc)}
                  className="text-blue-600 cursor-pointer ml-2 font-medium hover:underline"
                >
                  {showFullDesc ? "Show Less" : "Show More"}
                </span>
              )}
            </p>
            <div className="flex items-center gap-6 mb-6">
              <p className="text-3xl font-bold text-gray-900">
                ₹{product.price.toLocaleString()}
              </p>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    fill={
                      index < (product.rating || 0) ? "currentColor" : "none"
                    }
                    className={`w-6 h-6 ${
                      index < (product.rating || 0)
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-2 text-lg md:text-xl font-semibold text-gray-800">
                  {product.rating || 0} / 5
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="mt-4 md:mt-auto bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-2xl font-semibold text-lg hover:from-blue-600 hover:to-indigo-700 transition-all shadow-lg hover:shadow-2xl"
          >
            Add to Cart
          </button>
        </div>
      </div>

      <Link
        to="/products"
        className="text-blue-500 underline mt-10 block text-lg hover:text-blue-700 transition"
      >
        ← Back to Products
      </Link>
    </div>
  );
};

export default ProductDetails;
