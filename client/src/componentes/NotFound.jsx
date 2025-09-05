import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-yellow-400 text-white relative overflow-hidden">
      
      {/* Decorative circles */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-white/20 rounded-full animate-bounce"></div>
      <div className="absolute bottom-20 right-20 w-60 h-60 bg-white/10 rounded-full animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-white/15 rounded-full -translate-x-1/2 -translate-y-1/2 animate-bounce"></div>

      <div className="z-10 text-center">
        <h1 className="text-9xl font-bold drop-shadow-lg">404</h1>
        <h2 className="text-3xl mt-4 font-semibold">Oops! Page Not Found</h2>
        <p className="mt-3 text-lg max-w-md mx-auto">
          The page you are looking for might have been removed or doesn’t exist.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block px-8 py-3 bg-white text-purple-600 font-bold rounded-full shadow-lg hover:bg-purple-100 transition transform hover:scale-105"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
