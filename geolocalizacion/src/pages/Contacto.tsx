// src/pages/Contacto.tsx
import React from "react";
import { Box, Typography, TextField, Button, Grid, Card, CardContent } from "@mui/material";
import { motion } from "framer-motion";

export default function Contacto() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)",
        py: 6,
        px: { xs: 2, md: 6 },
      }}
    >
      <Typography
        variant="h3"
        align="center"
        fontWeight="bold"
        sx={{ mb: 4, color: "#1a237e" }}
      >
        Contáctanos
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {/* Formulario */}
        <Grid item xs={12} md={6}>
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}>
            <Card sx={{ borderRadius: 3, boxShadow: 6 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Envíanos un mensaje
                </Typography>
                <TextField label="Nombre" fullWidth margin="normal" />
                <TextField label="Correo electrónico" fullWidth margin="normal" />
                <TextField
                  label="Mensaje"
                  fullWidth
                  margin="normal"
                  multiline
                  rows={4}
                />
                <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                  Enviar
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Información */}
        <Grid item xs={12} md={5}>
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }}>
            <Card sx={{ borderRadius: 3, boxShadow: 6, backgroundColor: "#1a237e", color: "white" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Información de contacto
                </Typography>
                <Typography variant="body1">📍 Duitama, Boyacá, Colombia</Typography>
                <Typography variant="body1">📧 idealsevents@gmail.com</Typography>
                <Typography variant="body1">📞 +57 312 345 6789</Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  También puedes seguirnos en nuestras redes sociales para más información y actualizaciones.
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
}

// src/pages/Contacto.tsx
// import React from "react";
// import { Container, Typography, Box, Paper } from "@mui/material";
// import Navbar from "../components/Navbar";

// export default function Contacto() {
//   return (
//     <>
//     <Navbar />
//     <Container sx={{ py: 6 }}>
//       <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
//         <Typography variant="h4" align="center" gutterBottom color="primary">
//           Contacto
//         </Typography>

//         <Typography variant="body1" align="center" paragraph>
//           Si deseas ponerte en contacto con nosotros, puedes escribirnos a:
//         </Typography>

//         <Box sx={{ textAlign: "center" }}>
//           <Typography variant="h6" color="success.main">
//             📧 geotechproyecto@gmail.com
//           </Typography>
//           <Typography variant="h6" color="success.main">
//             ☎️ +57 310 000 0000
//           </Typography>
//         </Box>
//       </Paper>
//     </Container>
//      </>
//   );
// }
