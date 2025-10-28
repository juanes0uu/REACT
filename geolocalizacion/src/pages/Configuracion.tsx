import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
  Divider,
  Button,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"; 

export default function Configuracion() {
  const navigate = useNavigate();
  const [notificaciones, setNotificaciones] = useState(true);
  const [modoOscuro, setModoOscuro] = useState(false);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      <Navbar />

      <Box sx={{ maxWidth: 900, mx: "auto", mt: 5, p: 3 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom color="#2e7d32">
          ⚙️ Configuración de Usuario
        </Typography>

        {/* Sección Preferencias */}
        <Card sx={{ mb: 3, borderRadius: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Preferencias
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <FormControlLabel
              control={
                <Switch
                  checked={notificaciones}
                  onChange={(e) => setNotificaciones(e.target.checked)}
                  color="success"
                />
              }
              label="Activar notificaciones"
            />

            <FormControlLabel
              control={
                <Switch
                  checked={modoOscuro}
                  onChange={(e) => setModoOscuro(e.target.checked)}
                  color="success"
                />
              }
              label="Modo oscuro"
            />
          </CardContent>
        </Card>

        {/* Sección de cuenta */}
        <Card sx={{ mb: 3, borderRadius: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Seguridad de la cuenta
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <TextField
              type="password"
              label="Nueva contraseña"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              sx={{
                bgcolor: "#2e7d32",
                "&:hover": { bgcolor: "#256028" },
              }}
            >
              Actualizar contraseña
            </Button>
          </CardContent>
        </Card>

        {/* Sección Acerca de */}
        <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Acerca de GeoTech
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body1" sx={{ color: "gray" }}>
              GeoTech es un proyecto enfocado en la visualización interactiva de
              rutas, empresas y recursos locales dentro de la Ciudadela Industrial
              de Duitama. Desarrollado por un equipo interdisciplinario con la
              misión de promover la tecnología y el turismo local.
            </Typography>

            <Button
              variant="outlined"
              sx={{
                mt: 2,
                borderColor: "#2e7d32",
                color: "#2e7d32",
                "&:hover": { bgcolor: "#e8f5e9" },
              }}
              onClick={() => navigate("/")}
            >
              ← Volver al Dashboard
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
