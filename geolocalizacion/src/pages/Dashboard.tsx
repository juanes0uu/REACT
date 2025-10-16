import React from "react";
import "../styles/dashboard.css";
import LeftSidebar from "../components/LeftSidebar";
import RightPanel from "../components/RightPanel";
import Mapa from "../components/Mapa2";

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      {/* Sidebar izquierda */}
      <div className="sidebar-left">
        <LeftSidebar />
      </div>

      {/* Sección central con encabezado + mapa */}
      <div className="main-section">
        <header className="main-header">
          <h2>Recorrido Ciudadela</h2>
        </header>

        <div style={{ position: "relative", flex: 1 }}>
          <Mapa />
        </div>
      </div>

      {/* Sidebar derecha */}
      <div className="sidebar-right">
        <RightPanel />
      </div>
    </div>
  );
}
