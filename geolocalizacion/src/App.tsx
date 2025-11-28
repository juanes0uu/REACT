// src/App.tsx
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Perfil from "./pages/Perfil";
import Info from "./pages/Info";
import Contacto from "./pages/Contacto";
import Configuracion from "./pages/Configuracion";
import VisitanteDashboard from "./pages/VisitanteDashboard";
import Navbar from "./components/Navbar"; // tu navbar global
import TestMapWS from "./components/TestMapWS";


export default function App() {
  // 👇 Estado global del Drawer
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* 🔝 Navbar visible en todas las páginas */}
      <Navbar onMenuClick={() => setSidebarOpen(true)} />

      {/* Rutas */}
      <Routes>
        <Route
          path="/"
          element={
            <Dashboard
              sidebarOpen={sidebarOpen}
              onSidebarClose={() => setSidebarOpen(false)}
            />
          }
        />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/info" element={<Info />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/configuracion" element={<Configuracion />} />
        <Route path="/visitante" element={<VisitanteDashboard />} />
        <Route path="/test-ws" element={<TestMapWS />} />

      </Routes>
    </>
  );
}
