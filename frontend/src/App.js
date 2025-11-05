import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import MarketplacePage from "./pages/MarketplacePage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/marketplace" element={<ProtectedRoute><MarketplacePage /></ProtectedRoute>} />
        <Route path="*" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
