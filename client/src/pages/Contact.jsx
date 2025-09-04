import React, { useState } from "react";
import { Mail, User, MessageSquare } from "lucide-react"; // Optional icons

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! ✅");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 via-white to-blue-50 min-h-screen p-6 flex flex-col items-center">
      {/* Hero Section */}
      <section className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Get in Touch
        </h1>
        <p className="text-gray-700 max-w-2xl mx-auto text-lg">
          Have questions or feedback? Fill out the form below and we'll get back
          to you as soon as possible.
        </p>
      </section>

      {/* Contact Form */}
      <div className="max-w-lg w-full bg-white p-10 rounded-3xl shadow-xl">
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              required
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              required
            />
          </div>

          <div className="relative">
            <MessageSquare className="absolute left-3 top-3 text-gray-400" />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 pl-10 h-36 resize-none focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white p-3 rounded-xl font-semibold text-lg hover:bg-blue-700 transition shadow-md"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
