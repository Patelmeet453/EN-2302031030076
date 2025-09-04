import React, { useState } from "react";
import { addProduct } from "../api";
import { toast } from "react-toastify";

const AdminAddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(""); // For image preview

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "image") setPreview(value); // Show image preview
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.price ||
      !formData.category ||
      !formData.image
    ) {
      toast.error("❌ Please fill all required fields");
      return;
    }

    try {
      setLoading(true);
      const res = await addProduct(formData);
      toast.success("✅ Product added successfully!");
      console.log(res.data);

      setFormData({
        name: "",
        price: "",
        description: "",
        image: "",
        category: "",
      });
      setPreview("");
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error("❌ Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-10">
      <div className="p-6 max-w-lg mx-auto  rounded-2xl shadow-lg border border-gray-200 ">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-900">
          Add New Product
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Product Name */}
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            required
          />

          {/* Price */}
          <input
            type="number"
            name="price"
            placeholder="Price (₹)"
            value={formData.price}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            required
          />

          {/* Description */}
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3 h-24 resize-none focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
          />

          {/* Image URL */}
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            required
          />

          {/* Image Preview */}
          {preview && (
            <div className="flex justify-center my-2">
              <img
                src={preview}
                alt="Preview"
                className="h-44 w-44 object-cover rounded-xl border border-gray-300 shadow-sm transition hover:scale-105"
              />
            </div>
          )}

          {/* Category */}
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            required
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-600 text-white p-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all shadow-md ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminAddProduct;
