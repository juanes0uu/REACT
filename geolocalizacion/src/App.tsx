// src/App.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Perfil from "./pages/Perfil";
import Info from "./pages/Info";
import Contacto from "./pages/Contacto";  

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/info" element={<Info />} />
      <Route path="/contacto" element={<Contacto />} />
    </Routes>
  );
}
