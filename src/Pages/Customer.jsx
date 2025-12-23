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
      await axios.post(
        `${userUrl}/customer/create`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Customer registered successfully");
      navigate("/deals");
    } catch (err) {
      alert(err.message || "Customer registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Register Customer
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Customer Name
            </label>
            <input
              type="text"
              name="customerName"
              onChange={handleChange}
              required
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter customer name"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Customer Number
            </label>
            <input
              type="text"
              name="customerNumber"
              onChange={handleChange}
              required
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Phone number"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Deal
            </label>
            <input
              type="text"
              name="deal"
              onChange={handleChange}
              required
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Deal details"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              onChange={handleChange}
              required
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Customer location"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md font-semibold hover:bg-blue-600 transition"
          >
            Register Customer
          </button>
        </form>
      </div>
    </div>
  );
}

export default CustomerRegister;
