import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { toast } from "react-toastify";
import {
  getCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer,
} from "../api";

interface Customer {
  _id: string;
  name: string;
  email: string;
  password?: string;
  address: string;
  isAdmin?: boolean;
}

const AdminCustomerDashboard: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [formData, setFormData] = useState<Omit<Customer, "_id">>({
    name: "",
    email: "",
    password: "",
    address: "",
    isAdmin: false,
  });
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  const fetchCustomers = async () => {
    try {
      const res = await getCustomers();
      setCustomers(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch customers");
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      address: "",
      isAdmin: false,
    });
    setEditingCustomer(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast.error("Name and Email are required");
      return;
    }
    try {
      if (editingCustomer) {
        await updateCustomer(editingCustomer._id, formData);
        toast.success("Customer updated");
      } else {
        await addCustomer(formData);
        toast.success("Customer added");
      }
      fetchCustomers();
      resetForm();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save customer");
    }
  };

  const handleEdit = (customer: Customer) => {
    setEditingCustomer(customer);
    setFormData({
      name: customer.name,
      email: customer.email,
      password: "",
      address: customer.address,
      isAdmin: customer.isAdmin || false,
    });
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this customer?")) return;
    try {
      await deleteCustomer(id);
      toast.success("Customer deleted");
      fetchCustomers();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete customer");
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-6">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Customer Management
        </h2>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-6"
        >
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
          {!editingCustomer && (
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          )}
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isAdmin"
              checked={formData.isAdmin || false}
              onChange={handleChange}
              className="w-4 h-4"
            />
            Admin
          </label>
          <button
            type="submit"
            className="md:col-span-5 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            {editingCustomer ? "Update" : "Add"} Customer
          </button>
        </form>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse shadow-md">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Address</th>
                <th className="p-3 text-left">Admin</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c._id} className="border-t hover:bg-gray-100">
                  <td className="p-3 font-medium">{c.name}</td>
                  <td className="p-3">{c.email}</td>
                  <td className="p-3">{c.address}</td>
                  <td className="p-3">{c.isAdmin ? "Yes" : "No"}</td>
                  <td className="p-3 text-center space-x-2">
                    <button
                      onClick={() => handleEdit(c)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(c._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {customers.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center p-6 text-gray-500">
                    No customers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminCustomerDashboard;
