// import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import axios from "axios";

// const API_URL = "http://localhost:5000/api/products"; // Backend URL

// const AdminProductDashboard = () => {
//   const [products, setProducts] = useState([]);
//   const [formData, setFormData] = useState({
//     name: "",
//     price: "",
//     description: "",
//     image: "",
//     category: "",
//      quantity: "",
//   });
//   const [preview, setPreview] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [editingProduct, setEditingProduct] = useState(null);

//   // Fetch products
//   const fetchProducts = async () => {
//     try {
//       const res = await axios.get(API_URL);
//       setProducts(res.data);
//     } catch (err) {
//       console.error(err);
//       toast.error("❌ Failed to fetch products");
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   // Handle input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     if (name === "image") setPreview(value);
//   };

//   // Reset form
//   const resetForm = () => {
//     setFormData({
//       name: "",
//       price: "",
//       description: "",
//       image: "",
//       category: "",
//     });
//     setPreview("");
//     setEditingProduct(null);
//   };

//   // Create or Update product
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (
//       !formData.name ||
//       !formData.price ||
//       !formData.image ||
//       !formData.category
//     ) {
//       toast.error("❌ Please fill all required fields");
//       return;
//     }

//     try {
//       setLoading(true);
//       if (editingProduct) {
//         await axios.put(`${API_URL}/${editingProduct._id}`, {
//           name: formData.name,
//           price: formData.price,
//           description: formData.description,
//           image: formData.image,
//           category: formData.category,
//           quantity: formData.quantity,
//         });
//         toast.success("✅ Product updated successfully!");
//       } else {
//         await axios.post(API_URL, formData);
//         toast.success("✅ Product added successfully!");
//       }
//       fetchProducts();
//       resetForm();
//     } catch (err) {
//       console.error(err);
//       toast.error("❌ Failed to save product");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Edit product
//   // const handleEdit = (product) => {
//   //   setEditingProduct(product);
//   //   setFormData(product);
//   //   setPreview(product.image);
//   // };

//   const handleEdit = (product) => {
//   setEditingProduct(product);
//   setFormData({
//      name: product.name || "",
//       price: product.price || "",
//       description: product.description || "",
//       image: product.image || "",
//       category: product.category || "",
//       quantity: product.quantity || "",
//   });
//   setPreview(product.image);
// };

//   // Delete product
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this product?"))
//       return;
//     try {
//       await axios.delete(`${API_URL}/${id}`);
//       toast.success("🗑️ Product deleted!");
//       fetchProducts();
//     } catch (err) {
//       console.error(err);
//       toast.error("❌ Failed to delete product");
//     }
//   };

//   return (
//     <div className="min-h-screen p-6 bg-gray-100">
//       <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg p-6">
//         <h2 className="text-3xl font-bold text-center mb-6">
//           Admin Product Dashboard
//         </h2>

//         {/* Product Form */}
//         <form
//           onSubmit={handleSubmit}
//           className="sm:flex gap-6 items-start border-b pb-6 mb-6 space-y-6"
//         >
//           <div className="flex-1 flex flex-col gap-3">
//             <input
//               type="text"
//               name="name"
//               placeholder="Product Name"
//               value={formData.name}
//               onChange={handleChange}
//               className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
//             />
//             <input
//               type="number"
//               name="price"
//               placeholder="Price"
//               value={formData.price}
//               onChange={handleChange}
//               className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
//             />
//             <textarea
//               name="description"
//               placeholder="Description"
//               value={formData.description}
//               onChange={handleChange}
//               className="border p-3 rounded-lg h-20 resize-none focus:ring-2 focus:ring-blue-400 outline-none"
//             />
//             <input
//               type="text"
//               name="image"
//               placeholder="Image URL"
//               value={formData.image}
//               onChange={handleChange}
//               className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
//             />
//             {/* Quantity */}
//             <input
//               type="number"
//               name="quantity"
//               placeholder="Stock Quantity"
//               value={formData.quantity}
//               onChange={handleChange}
//               className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
//               required
//             />
//             <input
//               type="text"
//               name="category"
//               placeholder="Category"
//               value={formData.category}
//               onChange={handleChange}
//               className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
//             />

//             <button
//               type="submit"
//               disabled={loading}
//               className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-all"
//             >
//               {loading
//                 ? "Saving..."
//                 : editingProduct
//                 ? "Update Product"
//                 : "Add Product"}
//             </button>
//           </div>

//           {/* Image Preview */}
//           {preview && (
//             <div className="flex justify-center">
//               <img
//                 src={preview}
//                 alt="Preview"
//                 className="w-40 h-40 object-cover rounded-xl border"
//               />
//             </div>
//           )}
//         </form>
//       </div>
//       {/* Product Table */}
//       <div className="overflow-x-auto rounded-lg  shadow-sm max-w-7xl mx-auto bg-white mt-10">
//         <table className="w-full text-sm text-left border-collapse">
//           <thead className="bg-blue-600 text-white sticky top-0">
//             <tr>
//               <th className="p-3">Image</th>
//               <th className="p-3">Name</th>
//               <th className="p-3">Price</th>
//               <th className="p-3">Stock</th>
//               <th className="p-3">Category</th>
//               <th className="p-3 text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.length > 0 ? (
//               products.map((p) => (
//                 <tr
//                   key={p._id}
//                   className="hover:bg-gray-100 transition duration-200"
//                 >
//                   <td className="p-3">
//                     <img
//                       src={p.image}
//                       alt={p.name}
//                       className="w-16 h-16 object-cover rounded-md border"
//                     />
//                   </td>
//                   <td className="p-3 font-medium">{p.name}</td>
//                   <td className="p-3 font-semibold text-green-600">
//                     ₹{p.price}
//                   </td>
//                   <td className="p-3">{p.quantity}</td>
//                   <td className="p-3">{p.category}</td>
//                   <td className="p-3 text-center flex justify-center gap-2">
//                     <button
//                       onClick={() => handleEdit(p)}
//                       className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(p._id)}
//                       className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5" className="text-center p-6 text-gray-500">
//                   No products found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AdminProductDashboard;

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const API_URL = "http://localhost:5000/api/products"; // Backend URL

const AdminProductDashboard = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    category: "",
    quantity: "",
  });
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await axios.get(API_URL);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "image") setPreview(value);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      description: "",
      image: "",
      category: "",
      quantity: "",
    });
    setPreview("");
    setEditingProduct(null);
  };

  // Create or Update product
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.price ||
      !formData.image ||
      !formData.category
    ) {
      toast.error("❌ Please fill all required fields");
      return;
    }

    try {
      setLoading(true);
      if (editingProduct) {
        await axios.put(`${API_URL}/${editingProduct._id}`, {
          name: formData.name,
          price: formData.price,
          description: formData.description,
          image: formData.image,
          category: formData.category,
          quantity: formData.quantity,
        });
        toast.success("✅ Product updated successfully!");
      } else {
        await axios.post(API_URL, formData);
        toast.success("✅ Product added successfully!");
      }
      fetchProducts();
      resetForm();
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  // Edit product
  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name || "",
      price: product.price || "",
      description: product.description || "",
      image: product.image || "",
      category: product.category || "",
      quantity: product.quantity || "",
    });
    setPreview(product.image);
  };

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      toast.success("🗑️ Product deleted!");
      fetchProducts();
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to delete product");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-3xl font-bold text-center mb-6">
          Admin Product Dashboard
        </h2>

        {/* Product Form */}
        <form
          onSubmit={handleSubmit}
          className="sm:flex gap-6 items-start border-b pb-6 mb-6 space-y-6"
        >
          <div className="flex-1 flex flex-col gap-3">
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleChange}
              className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="border p-3 rounded-lg h-20 resize-none focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={formData.image}
              onChange={handleChange}
              className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
            {/* Quantity */}
            <input
              type="number"
              name="quantity"
              placeholder="Stock Quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-all"
            >
              {loading
                ? "Saving..."
                : editingProduct
                ? "Update Product"
                : "Add Product"}
            </button>
          </div>

          {/* Image Preview */}
          {preview && (
            <div className="flex justify-center">
              <img
                src={preview}
                alt="Preview"
                className="w-40 h-40 object-cover rounded-xl border"
              />
            </div>
          )}
        </form>
      </div>

      {/* Product Table */}
      <div className="overflow-x-auto rounded-lg shadow-sm max-w-7xl mx-auto bg-white mt-10">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-blue-600 text-white sticky top-0">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Price</th>
              <th className="p-3">Category</th>
              <th className="p-3">Quantity</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((p) => (
                <tr
                  key={p._id}
                  className="hover:bg-gray-100 transition duration-200"
                >
                  <td className="p-3">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-16 h-16 object-cover rounded-md border"
                    />
                  </td>
                  <td className="p-3 font-medium">{p.name}</td>
                  <td className="p-3 font-semibold text-green-600">
                    ₹{p.price}
                  </td>
                  <td className="p-3">{p.category}</td>
                  <td className="p-3">{p.quantity}</td>
                  <td className="p-3 text-center flex justify-center gap-2">
                    <button
                      onClick={() => handleEdit(p)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-6 text-gray-500">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProductDashboard;
