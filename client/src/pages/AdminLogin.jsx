import { useState } from "react";
import { loginUser } from "../api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);

      if (!res.data.isAdmin) {
        toast.error("Not authorized as admin");
        return;
      }

      // Save under admin keys
      sessionStorage.setItem("adminToken", res.data.token);
      sessionStorage.setItem("adminData", JSON.stringify(res.data));

      toast.success("Admin Login Successful!");
      navigate("/admin-product-dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-400 to-pink-600 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-10 flex flex-col gap-5 animate-fadeIn"
      >
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Admin Portal
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Admin Email"
          onChange={handleChange}
          required
          className="border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-red-400 focus:outline-none transition"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-red-400 focus:outline-none transition"
        />

        <button
          type="submit"
          className="bg-red-600 text-white font-semibold py-3 rounded-xl hover:bg-red-700 transition shadow-md"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;





// import { useState } from "react";
// import { loginUser } from "../api";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const AdminLogin = () => {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ email: "", password: "" });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   try {
//     const res = await loginUser(form);

//     if (!res.data.isAdmin) {
//       toast.error("Not authorized as admin");
//       return;
//     }

//     // Save under admin keys
//     sessionStorage.setItem("adminToken", res.data.token);
//     sessionStorage.setItem("adminData", JSON.stringify(res.data));

//     toast.success("Admin Login Successful!");
//     navigate("/admin-dashboard");
//   } catch (err) {
//     toast.error(err.response?.data?.message || "Login failed");
//   }
// };


//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded-xl shadow-md w-96"
//       >
//         <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
//         <input
//           type="email"
//           name="email"
//           placeholder="Admin Email"
//           onChange={handleChange}
//           required
//           className="w-full p-3 mb-3 border rounded"
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           onChange={handleChange}
//           required
//           className="w-full p-3 mb-3 border rounded"
//         />
//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AdminLogin;
