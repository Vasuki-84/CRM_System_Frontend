import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userUrl } from "../baseUrl";
import axios from "axios";

function Login() {
  const [form, setForm] = useState({
    userEmail: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${userUrl}/user/login`, form);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.username); 
      navigate("/customerLogin");
    } catch (err) {
      alert(err.response?.data?.message || "Login error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 p-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8">
        <h2 className="text-center font-extrabold text-2xl mb-6 text-gray-800">
          Login Page
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="userEmail"
              placeholder="user@gmail.com"
              value={form.userEmail}
              onChange={handleChange}
              required
              className="w-full border rounded-md p-3 shadow-sm focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="********"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full border rounded-md p-3 shadow-sm focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition"
          >
            Login
          </button>
        </form>

        <div className="text-center text-gray-600 mt-4">
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="text-orange-400 font-semibold hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
