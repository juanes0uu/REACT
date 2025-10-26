// src/pages/Info.tsx
import React from "react";
import { Box, Typography, Card, CardContent, Grid, Avatar, Divider } from "@mui/material";
import { motion } from "framer-motion";

export default function Info() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)",
        py: 6,
        px: { xs: 2, md: 6 },
      }}
    >
      {/* Título principal */}
      <Typography
        variant="h3"
        align="center"
        fontWeight="bold"
        gutterBottom
        sx={{ color: "#1a237e", mb: 4 }}
      >
        Sobre Nuestro Proyecto
      </Typography>

      {/* Tarjetas principales: Misión, Visión, Futuro */}
      <Grid container spacing={4} justifyContent="center">
        {[
          {
            title: "Misión",
            text:
              "Desarrollar una plataforma interactiva que fomente la conexión entre estudiantes, empresas e instituciones educativas, potenciando el aprendizaje práctico y la innovación tecnológica.",
          },
          {
            title: "Visión",
            text:
              "Convertirnos en una herramienta de referencia para la educación aplicada y la vinculación con el entorno industrial, impulsando el talento local hacia el futuro digital.",
          },
          {
            title: "Futuro",
            text:
              "A futuro buscamos integrar tecnologías de geolocalización, IA y realidad aumentada para crear experiencias más inmersivas e interactivas.",
          },
        ].map((item, index) => (
          <Grid item xs={12} md={4} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 6,
                  backgroundColor: "white",
                  textAlign: "center",
                  p: 2,
                }}
              >
                <CardContent>
                  <Typography variant="h5" fontWeight="bold" sx={{ color: "#3949ab" }}>
                    {item.title}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="body1" color="text.secondary">
                    {item.text}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Sección de Creadores */}
      <Box sx={{ mt: 8 }}>
        <Typography
          variant="h4"
          align="center"
          fontWeight="bold"
          sx={{ color: "#1a237e", mb: 3 }}
        >
          Creadores del Proyecto
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {[
            { name: "Compañero 1", role: "Frontend & UI Designer" },
            { name: "Compañero 2", role: "Backend & Servidor Deno" },
            { name: "Compañero 3", role: "Base de Datos" },
            { name: "Compañero 4", role: "Integración y Documentación" },
          ].map((person, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card sx={{ textAlign: "center", borderRadius: 3, boxShadow: 5 }}>
                  <CardContent>
                    <Avatar
                      src="/assets/user.png"
                      sx={{
                        width: 80,
                        height: 80,
                        margin: "0 auto",
                        mb: 2,
                        boxShadow: 4,
                      }}
                    />
                    <Typography variant="h6" fontWeight="bold">
                      {person.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {person.role}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

// // src/pages/Info.tsx
// import React from "react";
// import { Container, Typography, Box, Paper, Divider } from "@mui/material";
// import Navbar from "../components/Navbar";

// export default function Info() {
//   return (
//     <>
//     <Navbar />
//     <Container sx={{ py: 6 }}>
//       <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
//         <Typography variant="h4" align="center" gutterBottom color="primary">
//           Acerca de GeoTech
//         </Typography>

//         <Typography variant="body1" paragraph align="center">
//           GeoTech es un proyecto enfocado en la geolocalización dentro de la
//           Ciudadela Industrial de Duitama, desarrollado con el objetivo de
//           mejorar la interacción entre empresas, visitantes y servicios.
//         </Typography>

//         <Divider sx={{ my: 3 }} />

//         <Box sx={{ mb: 3 }}>
//           <Typography variant="h5" color="success.main">
//             Misión
//           </Typography>
//           <Typography variant="body1">
//             Ofrecer una plataforma intuitiva y moderna que permita ubicar,
//             visualizar y gestionar rutas dentro de la Ciudadela Industrial,
//             facilitando la conexión entre negocios, estudiantes y visitantes.
//           </Typography>
//         </Box>

//         <Box sx={{ mb: 3 }}>
//           <Typography variant="h5" color="success.main">
//             Visión
//           </Typography>
//           <Typography variant="body1">
//             Convertirnos en una herramienta esencial para la planeación y
//             movilidad en entornos industriales y educativos, expandiendo el uso
//             de GeoTech a otras zonas del país.
//           </Typography>
//         </Box>

//         <Box sx={{ mb: 3 }}>
//           <Typography variant="h5" color="success.main">
//             Futuro del Proyecto
//           </Typography>
//           <Typography variant="body1">
//             Se proyecta integrar inteligencia artificial para optimizar rutas,
//             monitorear tráfico y ofrecer estadísticas de movilidad en tiempo
//             real.
//           </Typography>
//         </Box>

//         <Box>
//           <Typography variant="h5" color="success.main">    
//             Creadores
//           </Typography>
//           <Typography variant="body1">
//             Proyecto desarrollado por el equipo de aprendicez SENA como parte de
//             su formación en desarrollo de software.:
//           </Typography>
//           <ul>
//             <li>Magda Alejandra </li>
//             <li>Eduard Fonseca  </li>
//             <li>Nicol Alarcón</li>
//             <li>Juan Castañeda </li>
//           </ul>
//         </Box>
//       </Paper>
//     </Container>
//     </>
//   );
// }


