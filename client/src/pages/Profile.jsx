import { useEffect, useState, useRef } from "react";
import { getProfile, updateProfile } from "../api"; // API helper
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Profile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    image: "",
  });

  const defaultImage =
    "https://cdn-icons-png.flaticon.com/512/847/847969.png";

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("userToken");
      if (!token) {
        toast.error("Please login first!");
        navigate("/login");
        return;
      }

      try {
        const res = await getProfile();
        setUser(res.data);
        setFormData(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        toast.error("Failed to fetch profile. Please login again.");
        localStorage.removeItem("token");
        navigate("/login");
      }
    };
    fetchUser();
  }, [navigate]);

  // Handle changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      const res = await updateProfile(formData);
      setUser(res.data);
      setEditMode(false);
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
        <h2 className="text-3xl font-bold text-blue-600 animate-pulse">
          Loading Profile...
        </h2>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-lg">
        {/* Profile Image */}
        <div className="flex flex-col items-center mb-6 relative">
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />
          <div className="relative">
            <img
              src={formData.image || defaultImage}
              alt="User Avatar"
              className="w-32 h-32 rounded-full object-cover shadow-md border-4 border-white cursor-pointer hover:opacity-90 transition"
              onClick={() => editMode && fileInputRef.current.click()}
            />
            {editMode && (
              <span className="absolute bottom-0 right-0 bg-blue-600 text-white text-xs px-2 py-1 rounded-full shadow">
                Edit
              </span>
            )}
          </div>
          <h2 className="text-3xl font-bold mt-4 text-gray-800">
            {formData.name || "User"}
          </h2>
        </div>

        {/* Profile Form */}
        <div className="flex flex-col gap-4">
          {editMode ? (
            <>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Full Name"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Email"
              />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Address"
              />
            </>
          ) : (
            <>
              <p className="text-lg text-gray-700">
                <strong className="text-gray-900">Name:</strong> {user.name}
              </p>
              <p className="text-lg text-gray-700">
                <strong className="text-gray-900">Email:</strong> {user.email}
              </p>
              <p className="text-lg text-gray-700">
                <strong className="text-gray-900">Address:</strong>{" "}
                {user.address || "Not Provided"}
              </p>
            </>
          )}

          {/* Buttons */}
          <div className="flex justify-between mt-6">
            {editMode ? (
              <>
                <button
                  onClick={handleSave}
                  className="bg-blue-500 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-400 transition cursor-pointer"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className="bg-gray-400 text-white px-5 py-2 rounded-lg shadow hover:bg-gray-500 transition cursor-pointer"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-400 transition cursor-pointer" 
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
