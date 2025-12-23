import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Customer from "./Pages/Customer";
import DealsDashboard from "./Pages/DealsDashboard";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/customerLogin" element={<Customer />} />
        <Route path="/deals" element={<DealsDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
