import React, { useState } from "react";
import axios from "axios";
import { userUrl } from "../baseUrl";
import { useNavigate } from "react-router-dom";

function CustomerRegister() {
  const [form, setForm] = useState({
    customerName: "",
    customerNumber: "",
    deal: "",
    location: "",
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${userUrl}/customer/create`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      localStorage.setItem("customerId", res.data.customer._id);
      alert("Customer registered successfully");
      navigate("/deals");
    } catch (err) {
      alert(err.response?.data?.message || "Customer registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 p-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8">
        <h2 className="text-center font-extrabold text-2xl mb-6 text-gray-800">
          Register Customer
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="customerName"
            placeholder="Customer Name"
            value={form.customerName}
            onChange={handleChange}
            required
            className="w-full border rounded-md p-3 shadow-sm focus:ring-2 focus:ring-indigo-400"
          />

          <input
            type="text"
            name="customerNumber"
            placeholder="Customer Number"
            value={form.customerNumber}
            onChange={handleChange}
            required
            className="w-full border rounded-md p-3 shadow-sm focus:ring-2 focus:ring-indigo-400"
          />

          <input
            type="text"
            name="deal"
            placeholder="Deal"
            value={form.deal}
            onChange={handleChange}
            required
            className="w-full border rounded-md p-3 shadow-sm focus:ring-2 focus:ring-indigo-400"
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            required
            className="w-full border rounded-md p-3 shadow-sm focus:ring-2 focus:ring-indigo-400"
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition"
          >
            Register Customer
          </button>
        </form>
      </div>
    </div>
  );
}

export default CustomerRegister;
