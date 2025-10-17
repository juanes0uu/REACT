// src/App.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Perfil from "./pages/Perfil";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/perfil" element={<Perfil />} />
    </Routes>
  );
}
