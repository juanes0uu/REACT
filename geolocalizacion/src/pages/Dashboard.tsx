import React from "react";
import { Drawer } from "@mui/material";
import Mapa from "../components/Mapa2";
import LeftSidebar from "../components/LeftSidebar";

interface DashboardProps {
  sidebarOpen: boolean;
  onSidebarClose: () => void;
}

export default function Dashboard({ sidebarOpen, onSidebarClose }: DashboardProps) {
  return (
    <div
      className="dashboard-container"
      style={{ height: "100vh", display: "flex", flexDirection: "column" }}
    >
      {/*  Contenido principal */}
      <div style={{ flex: 1, position: "relative" }}>
        <Mapa />
      </div>

      {/*  Sidebar (Drawer) */}
      <Drawer
        anchor="left"
        open={sidebarOpen}
        onClose={onSidebarClose}
        PaperProps={{
          sx: {
            width: 300,
            backgroundColor: "#f9fafb",
            color: "#111827",
            padding: 3,
          },
        }}
      >
        <LeftSidebar onClose={onSidebarClose} />
      </Drawer>
    </div>
  );
}
