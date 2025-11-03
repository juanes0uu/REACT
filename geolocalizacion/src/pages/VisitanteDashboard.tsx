import React from "react";
import { Box, Typography, Button } from "@mui/material";
import Mapa from "../components/Mapa2";
import FooterControles from "../components/FooterControles";
import LeftSidebar from "../components/LeftSidebar";

export default function VisitanteDashboard() {
  return (
    <Box sx={{ display: "flex", height: "calc(100vh - 64px)" }}>
      {/* Sidebar izquierda */}
      <LeftSidebar modo="visitante" />

      {/* Contenido principal */}
      <Box sx={{ flex: 1, position: "relative" }}>
        <Mapa modo="visitante" />

        {/* Panel informativo flotante */}
        <Box
          sx={{
            position: "absolute",
            top: 20,
            left: 20,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            padding: 2,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography variant="h6">Bienvenido al Mapa Interactivo</Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Aquí puedes explorar rutas y puntos de interés de la Ciudadela Industrial.
          </Typography>
          <Button variant="contained" color="success">
            Ver rutas disponibles
          </Button>
        </Box>

        <FooterControles modo="visitante" />
      </Box>
    </Box>
  );
}
