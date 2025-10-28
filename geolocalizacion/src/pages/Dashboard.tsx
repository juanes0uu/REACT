// src/pages/Dashboard.tsx
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Drawer,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

import "../styles/dashboard.css";
import LeftSidebar from "../components/LeftSidebar";
import Mapa from "../components/Mapa2";

export default function Dashboard() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <div
      className="dashboard-container"
      style={{ height: "100vh", display: "flex", flexDirection: "column" }}
    >
      {/* 🌿 NAVBAR SUPERIOR */}
      <AppBar position="static" sx={{ backgroundColor: "#2e7d32" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton color="inherit" onClick={() => setSidebarOpen(true)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6">GeoTech</Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Typography sx={{ cursor: "pointer" }} onClick={() => navigate("/")}>
              Explorar
            </Typography>
            <Typography sx={{ cursor: "pointer" }} onClick={() => navigate("/info")}>
              Info
            </Typography>
            <Typography sx={{ cursor: "pointer" }} onClick={() => navigate("/contacto")}>
              Contacto
            </Typography>

            <IconButton onClick={handleMenuOpen}>
              <Avatar alt="Perfil" src="/avatar.png">
                <AccountCircleIcon />
              </Avatar>
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem onClick={() => navigate("/perfil")}>Perfil</MenuItem>
              <MenuItem onClick={() => alert("Configuración")}>Configuración</MenuItem>
              <MenuItem onClick={() => alert("Cerrar sesión")}>Cerrar sesión</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* 🗺️ MAPA */}
      <div style={{ flex: 1, position: "relative" }}>
        <Mapa />
      </div>

      {/* 📋 SIDEBAR */}
    <Drawer
        anchor="left"
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        PaperProps={{
          sx: {
            width: 300,
            backgroundColor: "#f9fafb",
            color: "#111827",
            padding: 3,
          },
        }}
      >
        <LeftSidebar onClose={() => setSidebarOpen(false)} />
    </Drawer>

    </div>
  );
}
