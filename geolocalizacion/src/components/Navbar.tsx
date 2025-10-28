// src/components/Navbar.tsx
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

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <AppBar position="static" sx={{ backgroundColor: "#2e7d32" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <MenuIcon />
          <Typography
            variant="h6"
            component="div"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            GeoTech
          </Typography>
        </Box>

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
            <MenuItem onClick={() => navigate("Configuracion")}>Configuración</MenuItem>
            <MenuItem onClick={() => alert("Cerrar sesión")}>
              Cerrar sesión
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
