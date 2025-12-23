import React, { useEffect, useState } from "react";
import axios from "axios";
import { userUrl } from "../baseUrl";
import { useNavigate } from "react-router-dom";

function DealsDashboard() {
  const [deals, setDeals] = useState([]);
  const [customerId, setCustomerId] = useState("");
  const [editingDealId, setEditingDealId] = useState(null);

  const [form, setForm] = useState({
    customerId: "",
    title: "",
    description: "",
    amount: "",
    location: "",
    dealStatus: true,
  });

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Load customerId from localStorage
  useEffect(() => {
    const storedCustomerId = localStorage.getItem("customerId");
    if (storedCustomerId) {
      setCustomerId(storedCustomerId);
      setForm((prev) => ({ ...prev, customerId: storedCustomerId }));
    } else {
      // If no customerId, redirect to login
      navigate("/login");
    }
  }, [navigate]);

  // Fetch deals
  const getDeals = async () => {
    try {
      const res = await axios.get(`${userUrl}/deals`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDeals(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDeals();
  }, []);

  // Create or update deal
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingDealId) {
        await axios.put(`${userUrl}/deals/update/${editingDealId}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEditingDealId(null);
        alert("Deal updated successfully");
      } else {
        await axios.post(`${userUrl}/deals/createDeal`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Deal created successfully");
      }

      setForm({
        customerId,
        title: "",
        description: "",
        amount: "",
        location: "",
        dealStatus: true,
      });
      getDeals();
    } catch (error) {
      alert(error.response?.data?.message || "Operation failed");
    }
  };

  // Delete deal
  const deleteDeal = async (id) => {
    if (!window.confirm("Delete this deal?")) return;

    try {
      await axios.delete(`${userUrl}/deals/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      getDeals();
    } catch (error) {
      alert("Delete failed");
    }
  };

  // Edit deal
  const editDeal = (deal) => {
    setForm({
      customerId: deal.customerId._id,
      title: deal.title,
      description: deal.description,
      amount: deal.amount,
      location: deal.location,
      dealStatus: deal.dealStatus,
    });
    setEditingDealId(deal._id);
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("customerId");
    navigate("/login");
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      {/* Header with Customer ID & Logout */}
      <div className="flex justify-between items-center mb-4">
        {customerId && (
          <div className="font-semibold">Customer ID: {customerId}</div>
        )}
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white py-1 px-4 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>

      {/* Deal Form */}
      <div className="bg-white shadow-md rounded p-6 mb-6 max-w-md mx-auto">
        <h2 className="text-xl font-bold text-center mb-4">
          {editingDealId ? "Edit Deal" : "Create Deal"}
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            value={form.customerId}
            readOnly
            className="w-full border p-2 rounded bg-gray-200 cursor-not-allowed"
          />
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Location"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            required
            className="w-full border p-2 rounded"
          />
          <select
            value={form.dealStatus}
            onChange={(e) =>
              setForm({ ...form, dealStatus: e.target.value === "true" })
            }
            className="w-full border p-2 rounded bg-green-200"
          >
            <option value="true">Active</option>
            <option value="false">Closed</option>
          </select>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {editingDealId ? "Update Deal" : "Create Deal"}
          </button>
        </form>
      </div>

      {/* Deals Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {deals.map((deal) => (
          <div
            key={deal._id}
            className="bg-white shadow-md rounded p-4 flex flex-col justify-between"
          >
            <div>
              <h3 className="font-bold text-lg">{deal.title}</h3>
              <p className="text-gray-600">{deal.description}</p>
              <p>
                <span className="font-semibold">Amount:</span> {deal.amount}
              </p>
              <p>
                <span className="font-semibold">Location:</span> {deal.location}
              </p>
              <p>
                <span className="font-semibold">Status:</span>{" "}
                {deal.dealStatus ? "Active" : "Closed"}
              </p>
            </div>
            <div className="flex mt-4 gap-2">
              <button
                onClick={() => editDeal(deal)}
                className="flex-1 bg-yellow-500 text-white py-1 rounded hover:bg-yellow-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => deleteDeal(deal._id)}
                className="flex-1 bg-red-600 text-white py-1 rounded hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DealsDashboard;
