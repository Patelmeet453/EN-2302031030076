import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./componentes/Layout";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import AdminAddProduct from "./admin/AdminAddProduct";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import AdminProductDashboard from "./admin/AdminProductDashboard";
import Checkout from "./pages/Checkout";
import ProtectedRoute from "./componentes/ProtectedRoute";
import AdminRoute from "./admin/AdminRoute";
import MyOrders from "./pages/OrderHistory";
import AdminOrders from "./admin/Orders";
import AdminDashboard from "./admin/AdminDashboard";
import AdminCustomerDashboard from "./admin/AdminCustomerDashboard";
import NotFound from "./componentes/NotFound";
import AdminLogin from "./pages/AdminLogin";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          

          {/* Protected Routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-orders"
            element={
              <ProtectedRoute>
                <MyOrders />
              </ProtectedRoute>
            }
          />

          {/* <Route
            path="/admin-route"
            element={
              <ProtectedRoute>
                <AdminOrders />
              </ProtectedRoute>
            }
          /> */}

          {/* Admin Routes (Optional - Add admin check later) */}
            <Route path="/admin-login" element={<AdminLogin />} />
           <Route
            path="/admin-dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin-product-dashboard"
            element={
              <AdminRoute>
                <AdminProductDashboard />
              </AdminRoute>
            }
          />
           <Route
            path="/admin-manage-customers"
            element={
              <AdminRoute>
                <AdminCustomerDashboard />
              </AdminRoute>
            }
          />
           <Route
            path="/admin-manage-orders"
            element={
              <AdminRoute>
                  <AdminOrders />
              </AdminRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
