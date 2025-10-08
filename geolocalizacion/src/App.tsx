import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      {/* si el usuario entra a otra ruta, lo mandamos al dashboard */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
