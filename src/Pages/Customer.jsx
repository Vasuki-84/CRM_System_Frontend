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
      // ✅ CAPTURE RESPONSE
      const res = await axios.post(`${userUrl}/customer/create`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // ✅ STORE CUSTOMER ID
      localStorage.setItem("customerId", res.data.customer._id);

      alert("Customer registered successfully");
      navigate("/deals");
    } catch (err) {
      alert(err.response?.data?.message || "Customer registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">
          Register Customer
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="customerName"
            placeholder="Customer Name"
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            name="customerNumber"
            placeholder="Customer Number"
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            name="deal"
            placeholder="Deal"
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            Register Customer
          </button>
        </form>
      </div>
    </div>
  );
}

export default CustomerRegister;
