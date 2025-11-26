import React from "react";
import { Box, Button } from "@mui/material";

interface Props {
  onGuardar: () => void;
  onCargar: () => void;
  onLimpiar: () => void;
  onCargarLugares: () => void;
  onSimular: () => void;
  onSimularMovimiento: () => void;
  onCrearLugar: () => void;
  guardando: boolean;
  rutaGuardadaId: number | null;
  puntos: [number, number][];
}

interface PropsVisitantes {
  onCargar: () => void;
  onLimpiar: () => void;
  onCargarLugares: () => void;
  onSimular: () => void;
  rutaGuardadaId: number | null;
  puntos: [number, number][];
  guardando: boolean;
}

const FooterControles: React.FC<Props> = ({
  onGuardar,
  onCargar,
  onLimpiar,
  onCargarLugares,
  onSimular,
  onSimularMovimiento,
  onCrearLugar,
  guardando,
  rutaGuardadaId,
  puntos,
}) => {
  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 16,
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        borderRadius: 3,
        boxShadow: "0px 4px 20px rgba(0,0,0,0.25)",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 1,
        px: 2,
        py: 1.5,
        zIndex: 1000,
        backdropFilter: "blur(6px)",
        width: "95%",
        maxWidth: 600,
      }}
    >
      <Button
        variant="contained"
        color="primary"
        disabled={guardando || !!rutaGuardadaId}
        onClick={onGuardar}
        size="small"
        sx={{ flex: "1 1 140px", fontSize: "0.8rem" }}
      >
        {guardando
          ? "Guardando..."
          : rutaGuardadaId
          ? `Guardada (ID ${rutaGuardadaId})`
          : "💾 Guardar"}
      </Button>

      <Button
        variant="contained"
        color="secondary"
        onClick={onCargar}
        size="small"
        sx={{ flex: "1 1 140px", fontSize: "0.8rem" }}
      >
        📂 Cargar
      </Button>

      <Button
        variant="outlined"
        color="error"
        onClick={onLimpiar}
        disabled={guardando || !!rutaGuardadaId}
        size="small"
        sx={{ flex: "1 1 140px", fontSize: "0.8rem" }}
      >
        🧹 Limpiar
      </Button>

      <Button
        variant="contained"
        color="success"
        onClick={onSimular}
        disabled={puntos.length === 0}
        size="small"
        sx={{ flex: "1 1 140px", fontSize: "0.8rem" }}
      >
        ▶️ Simular
      </Button>

      <Button
        variant="contained"
        color="warning"
        onClick={onSimularMovimiento}
        size="small"
        sx={{ flex: "1 1 140px", fontSize: "0.8rem" }}
      >
        🚶 Simular movimiento
      </Button>

      <Button
        variant="contained"
        color="success"
        onClick={onCrearLugar}
        size="small"
        sx={{ flex: "1 1 140px", fontSize: "0.8rem" }}
      >
        ➕ Lugar
      </Button>

      <Button
        variant="contained"
        color="info"
        onClick={onCargarLugares}
        size="small"
        sx={{ flex: "1 1 140px", fontSize: "0.8rem" }}
      >
        📍 Lugares
      </Button>
    </Box>
  );
};


const FooterControlesVisitantes: React.FC<PropsVisitantes> = ({
  onCargar,
  onLimpiar,
  onCargarLugares,
  onSimular,
  puntos
}) => {
  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 16,
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        borderRadius: 3,
        boxShadow: "0px 4px 20px rgba(0,0,0,0.25)",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 1,
        px: 2,
        py: 1.5,
        zIndex: 1000,
        backdropFilter: "blur(6px)",
        width: "95%",
        maxWidth: 600,
      }}
    >

      {/* Cargar ruta */}
      <Button
        variant="contained"
        color="secondary"
        onClick={onCargar}
        size="small"
        sx={{ flex: "1 1 140px", fontSize: "0.8rem" }}
      >
        📂 Cargar ruta
      </Button>

      {/* Limpiar ruta */}
      <Button
        variant="contained"
        color="error"
        onClick={onLimpiar}
        disabled={puntos.length === 0}
        size="small"
        sx={{ flex: "1 1 140px", fontSize: "0.8rem" }}
      >
        🧹 Limpiar
      </Button>

      {/* Simular movimiento */}
      <Button
        variant="contained"
        color="success"
        onClick={onSimular}
        disabled={puntos.length === 0}
        size="small"
        sx={{ flex: "1 1 140px", fontSize: "0.8rem" }}
      >
        ▶️ Simular
      </Button>

      {/* Cargar lugares */}
      <Button
        variant="contained"
        color="info"
        onClick={onCargarLugares}
        size="small"
        sx={{ flex: "1 1 140px", fontSize: "0.8rem" }}
      >
        📍 Lugares
      </Button>

    </Box>
  );
};


export { FooterControlesVisitantes };

export default FooterControles;
