import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Customer from "./Pages/Customer";
import DealsDashboard from "./Pages/DealsDashboard";
import Home from "./Pages/Home";
import ProtectedRoutes from "./Components/ProtectedRoutes";
import Header from "./Pages/Header";
import Footer from "./Pages/Footer";

function App() {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/customerLogin"
          element={
            <ProtectedRoutes>
              <Customer />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/deals"
          element={
            <ProtectedRoutes>
              <DealsDashboard />
            </ProtectedRoutes>
          }
        />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
