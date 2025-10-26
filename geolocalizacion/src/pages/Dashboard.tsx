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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

import "../styles/dashboard.css";
import LeftSidebar from "../components/LeftSidebar";
import Mapa from "../components/Mapa2";

export default function Dashboard() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => setAnchorEl(null);

  return (
    <div className="dashboard-container">
      {/* Sidebar izquierda */}
      <div className="sidebar-left">
        <LeftSidebar />
      </div>

      {/* Sección central */}
      <div className="main-section">
        {/* 🌿 NAVBAR SUPERIOR */}
        <AppBar position="static" sx={{ backgroundColor: "#2e7d32" }}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            {/* Lado izquierdo: logo y nombre */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <MenuIcon />
              <Typography variant="h6" component="div">
                GeoTech
              </Typography>
            </Box>

            {/* Lado derecho: botones y perfil */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
              <Typography
                variant="body1"
                sx={{ cursor: "pointer" }}
                onClick={() => navigate("/")}
              >
                Explorar
              </Typography>
              <Typography
                variant="body1"
                sx={{ cursor: "pointer" }}
                onClick={() => navigate("/info")}
              >
                Info
              </Typography>
              <Typography
                variant="body1"
                sx={{ cursor: "pointer" }}
                onClick={() => navigate("/contacto")}
              >
                Contacto
              </Typography>

              {/* Avatar con menú desplegable */}
              <IconButton onClick={handleMenuOpen}>
                <Avatar alt="Perfil" src="/avatar.png">
                  <AccountCircleIcon />
                </Avatar>
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuItem onClick={() => navigate("/perfil")}>Perfil</MenuItem>
                <MenuItem onClick={() => alert("Configuración")}>
                  Configuración
                </MenuItem>
                <MenuItem onClick={() => alert("Cerrar sesión")}>
                  Cerrar sesión
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>

        {/* 🗺️ Contenedor del mapa */}
        <div style={{ position: "relative", flex: 1 }}>
          <Mapa />
        </div>
      </div>
    </div>
  );
}
