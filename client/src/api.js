import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // your backend URL
});

// Attach token to every request
// API.interceptors.request.use((req) => {
//   const token = localStorage.getItem("token");
//   if (token) req.headers["Authorization"] = `Bearer ${token}`;
//   return req;
// });

API.interceptors.request.use((req) => {
  const userToken = localStorage.getItem("userToken");
  const adminToken = sessionStorage.getItem("adminToken");

  const token = adminToken || userToken;
  if (token) req.headers["Authorization"] = `Bearer ${token}`;
  return req;
});

// =====================
// 🔹 AUTH API
// =====================
export const registerUser = (formData) => API.post("/auth/register", formData);
export const loginUser = (formData) => API.post("/auth/login", formData);
export const getProfile = () => API.get("/auth/profile");

// Corrected: send updated form data to backend
export const updateProfile = (formData) => API.put("/auth/profile", formData);



// =====================
// 🔹 CUSTOMER API
// =====================

// Get all customers
export const getCustomers = () => API.get("/users");

// Get single customer by ID
export const getCustomerById = (id) => API.get(`/users/${id}`);

// Add a new customer
export const addCustomer = (customerData) => API.post("/users", customerData);

// Update customer
export const updateCustomer = (id, customerData) =>
  API.put(`/users/${id}`, customerData);

// Delete customer
export const deleteCustomer = (id) => API.delete(`/users/${id}`);


// =====================
// 🔹 PRODUCT API
// =====================
export const getProducts = () => API.get("/products");
export const getProductById = (id) => API.get(`/products/${id}`);
export const addProduct = (productData) => API.post("/products", productData);
export const updateProduct = (id, productData) =>
  API.put(`/products/${id}`, productData);
export const deleteProduct = (id) => API.delete(`/products/${id}`);


/// Cart Api  //////

export const getCart = () => API.get("/cart");
export const addToCart = (productId, quantity = 1) => API.post("/cart/add", { productId, quantity });
export const removeFromCart = (productId) => API.post("/cart/remove", { productId });
export const updateCartQuantity = (productId, quantity) => API.post("/cart/update", { productId, quantity });

// ✅ Clear Cart (NEW)
export const clearCart = () => API.delete("/cart/clear");


// =====================
// 🔹 ORDER API
// =====================
// Create a new order
export const createOrder = (orderData) =>
  API.post("/orders/create-order", orderData);
export const getMyOrders = (userId) =>
  API.get(`/orders/my-orders?userId=${userId}`);
export const getAllOrders = () => API.get("/orders/all");
export const updateOrderStatus = (orderId, status) =>
  API.put(`/orders/${orderId}`, { status });


// Create Razorpay order
export const createRazorpayOrder = (amount) =>
  API.post("/payment/create-razorpay-order", { amount });

// Verify Razorpay payment
export const verifyRazorpayPayment = (paymentData) =>
  API.post("/orders/verify-payment", paymentData);


export default API;
