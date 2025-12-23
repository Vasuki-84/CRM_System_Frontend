import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Customer from "./Pages/Customer";
import DealsDashboard from "./Pages/DealsDashboard"
import Home from "./Pages/Home";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/customerLogin" element={<Customer />} />
        <Route path="/deals" element={<DealsDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
