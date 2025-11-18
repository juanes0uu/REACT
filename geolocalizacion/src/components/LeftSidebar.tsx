// src/components/LeftSidebar.tsx
import React from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  MenuItem,
  TextField,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface LeftSidebarProps {
  onClose: () => void;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ onClose }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* 🔙 Botón para cerrar */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <IconButton onClick={onClose} size="small" sx={{ color: "#2e7d32" }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", color: "#1e293b", textAlign: "center" }}
        >
          Instrucciones
        </Typography>
      </Box>

      {/* Selects */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          select
          label="Tipo de partida"
          defaultValue=""
          variant="outlined"
          size="small"
          sx={{
            backgroundColor: "white",
            borderRadius: 1,
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#d1d5db" },
              "&:hover fieldset": { borderColor: "#2e7d32" },
            },
          }}
        >
          <MenuItem value="">Elige el tipo de partida</MenuItem>
          <MenuItem value="puntoA">Punto A</MenuItem>
          <MenuItem value="ubicacionActual">Ubicación actual</MenuItem>
        </TextField>

        <TextField
          select
          label="Destino"
          defaultValue=""
          variant="outlined"
          size="small"
          sx={{
            backgroundColor: "white",
            borderRadius: 1,
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#d1d5db" },
              "&:hover fieldset": { borderColor: "#2e7d32" },
            },
          }}
        >
          <MenuItem value="">Elige el destino</MenuItem>
          <MenuItem value="puntoB">Punto B</MenuItem>
          <MenuItem value="personalizado">Personalizado</MenuItem>
        </TextField>
      </Box>

      {/* Botón principal */}
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#2e7d32",
          "&:hover": { backgroundColor: "#1b5e20" },
          textTransform: "none",
          fontWeight: "bold",
        }}
      >
        Iniciar recorrido
      </Button>

      {/* Instrucción inferior */}
      <Divider />
      <Typography
        variant="body2"
        sx={{ color: "#6b7280", textAlign: "center" }}
      >
        Selecciona puntos en el mapa para crear una ruta.
      </Typography>
    </Box>
  );
};

export default LeftSidebar;
