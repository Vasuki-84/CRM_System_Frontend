import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem("username");
    if (storedName) {
      setUsername(storedName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("customerId");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-300 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">
          Welcome, {username || "Guest"}!
        </h1>
        {username && (
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        )}
      </div>

      {/* Dashboard cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div
          onClick={() => navigate("/customerLogin")}
          className="bg-gradient-to-r from-green-400 to-teal-400 shadow-md rounded p-6 cursor-pointer hover:shadow-xl transition flex flex-col items-center justify-center text-white"
        >
          <h2 className="font-bold text-xl mb-2">Customers</h2>
          <p className="text-center">View and manage customers</p>
        </div>

        <div
          onClick={() => navigate("/deals")}
          className="bg-gradient-to-r from-yellow-400 to-orange-400 shadow-md rounded p-6 cursor-pointer hover:shadow-xl transition flex flex-col items-center justify-center text-white"
        >
          <h2 className="font-bold text-xl mb-2">Deals</h2>
          <p className="text-center">Create, edit, and track deals</p>
        </div>

        <div
          onClick={() => navigate("/register")}
          className="bg-gradient-to-r from-purple-400 to-pink-400 shadow-md rounded p-6 cursor-pointer hover:shadow-xl transition flex flex-col items-center justify-center text-white"
        >
          <h2 className="font-bold text-xl mb-2">Register User</h2>
          <p className="text-center">Add a new CRM user</p>
        </div>

        <div
          onClick={() => navigate("/login")}
          className="bg-gradient-to-r from-blue-400 to-indigo-500 shadow-md rounded p-6 cursor-pointer hover:shadow-xl transition flex flex-col items-center justify-center text-white"
        >
          <h2 className="font-bold text-xl mb-2">Login</h2>
          <p className="text-center">Login to CRM as a user</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
