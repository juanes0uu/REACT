import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  Button,
  Paper,
  Divider,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

export default function Perfil() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* 🌿 Navbar superior */}
      <AppBar position="static" sx={{ backgroundColor: "#2e7d32" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <ArrowBackIcon
              sx={{ cursor: "pointer" }}
              onClick={() => navigate("/")}
            />
            <Typography variant="h6">Perfil de Usuario</Typography>
          </Box>
          <Typography variant="body1" sx={{ opacity: 0.8 }}>
            GeoTech
          </Typography>
        </Toolbar>
      </AppBar>

      {/* 🧑 Contenido principal */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 3,
        }}
      >
        <Paper
          elevation={4}
          sx={{
            width: "100%",
            maxWidth: 500,
            p: 4,
            borderRadius: 3,
            textAlign: "center",
            backgroundColor: "white",
          }}
        >
          <Avatar
            alt="Usuario"
            src="/assets/user.png"
            sx={{
              width: 120,
              height: 120,
              margin: "0 auto",
              mb: 2,
            }}
          />
          <Typography variant="h6" fontWeight="bold">
            Juan Esteban Castañeda Ortiz
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            @juanesteban
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Email:</strong> juanesteban@ejemplo.com
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Ciudad:</strong> Duitama, Boyacá
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            <strong>Miembro desde:</strong> Enero 2024
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Button
            variant="contained"
            startIcon={<EditIcon />}
            sx={{ backgroundColor: "#2e7d32", "&:hover": { backgroundColor: "#256428" } }}
          >
            Editar perfil
          </Button>
        </Paper>
      </Box>
    </Box>
  );
}
