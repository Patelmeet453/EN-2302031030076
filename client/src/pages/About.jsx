import React from "react";
import { Rocket, Users, Handshake } from "lucide-react"; // Lucide icons

const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* Hero Section */}
      <section className="text-center py-20">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6">About Us</h1>
        <p className="text-gray-700 max-w-3xl mx-auto text-lg leading-relaxed">
          We are dedicated to providing high-quality products and an exceptional
          customer experience. Our mission is to innovate, inspire, and make
          shopping seamless and enjoyable.
        </p>
      </section>

      {/* Mission & Vision Cards */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 py-16">
        <div className="bg-white p-8 rounded-3xl shadow-lg text-center hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
          <Rocket className="mx-auto text-4xl text-blue-600 mb-4" />
          <h2 className="text-2xl font-bold mb-3">Our Mission</h2>
          <p className="text-gray-700">
            To deliver top-notch products while creating a seamless, enjoyable
            shopping experience for our customers.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-lg text-center hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
          <Handshake className="mx-auto text-4xl text-green-600 mb-4" />
          <h2 className="text-2xl font-bold mb-3">Our Values</h2>
          <p className="text-gray-700">
            Integrity, quality, and customer-first mindset guide everything we do.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-lg text-center hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
          <Users className="mx-auto text-4xl text-purple-600 mb-4" />
          <h2 className="text-2xl font-bold mb-3">Our Team</h2>
          <p className="text-gray-700">
            A passionate, skilled team committed to innovation and excellence.
          </p>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="text-center py-16 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl text-white mx-6 md:mx-20">
        <h2 className="text-3xl font-bold mb-4">Join Us on Our Journey</h2>
        <p className="max-w-xl mx-auto mb-6">
          Whether as a customer or partner, we invite you to experience our
          commitment to excellence and innovation.
        </p>
        <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold text-lg hover:bg-gray-100 transition shadow-md">
          Learn More
        </button>
      </section>
    </div>
  );
};

export default About;
