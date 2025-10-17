import React from "react";
import { Box, Button } from "@mui/material";

interface Props {
  onGuardar: () => void;
  onCargar: () => void;
  onLimpiar: () => void;
  onSimular: () => void;
  onCrearLugar: () => void;
  guardando: boolean;
  rutaGuardadaId: number | null;
  puntos: [number, number][];
}

const FooterControles: React.FC<Props> = ({
  onGuardar,
  onCargar,
  onLimpiar,
  onSimular,
  onCrearLugar,
  guardando,
  rutaGuardadaId,
  puntos,
}) => {
  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 20,
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        borderRadius: 3,
        boxShadow: "0px 4px 20px rgba(0,0,0,0.25)",
        display: "flex",
        gap: 2,
        px: 3,
        py: 1.5,
        zIndex: 1000,
        backdropFilter: "blur(6px)",
      }}
    >
      <Button
        variant="contained"
        color="primary"
        disabled={guardando || !!rutaGuardadaId}
        onClick={onGuardar}
      >
        {guardando
          ? "Guardando..."
          : rutaGuardadaId
          ? `Guardada (ID ${rutaGuardadaId})`
          : "💾 Guardar ruta"}
      </Button>

      <Button variant="contained" color="secondary" onClick={onCargar}>
        📂 Cargar ruta
      </Button>

      <Button
        variant="outlined"
        color="error"
        onClick={onLimpiar}
        disabled={guardando || !!rutaGuardadaId}
      >
        🧹 Limpiar
      </Button>

      <Button
        variant="contained"
        color="success"
        onClick={onSimular}
        disabled={puntos.length === 0}
      >
        ▶️ Simular
      </Button>

      <Button variant="contained" color="success" onClick={onCrearLugar}>
        📍 Crear Lugar
      </Button>
    </Box>
  );
};

export default FooterControles;
