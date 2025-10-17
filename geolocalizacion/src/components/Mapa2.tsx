import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { api } from "../services/api";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import batmanImg from "../assets/batman.png";
import FooterControles from "./FooterControles";

// 🔧 Fix de íconos por defecto de Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// 🦇 Icono personalizado del usuario
const batmanIcon = L.icon({
  iconUrl: batmanImg,
  iconSize: [48, 48],
  iconAnchor: [24, 48],
  popupAnchor: [0, -45],
});

// 📍 Ícono tipo pin para los lugares
const lugarIcon = L.divIcon({
  className: "custom-lugar-icon",
  html: `<div style="font-size: 28px; transform: translate(-50%, -100%);">📍</div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 28],
});

// 👤 Usuario simulado (temporal)
const USUARIO_SIMULADO_ID = 1;

export default function Mapa2() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const [puntos, setPuntos] = useState<[number, number][]>([]);
  const [lugares, setLugares] = useState<any[]>([]);
  const polylineRef = useRef<L.Polyline | null>(null);
  const marcadorUsuarioRef = useRef<L.Marker | null>(null);
  const [guardando, setGuardando] = useState(false);
  const [rutaGuardadaId, setRutaGuardadaId] = useState<number | null>(null);
  const [modoCarga, setModoCarga] = useState(false);
  const [modoCrearLugar, setModoCrearLugar] = useState(false);
  const lugaresLayerRef = useRef<L.LayerGroup | null>(null);

  // ⚙️ Cargar todos los lugares guardados
  const cargarLugares = async () => {
    try {
      const data = await api.getLugares();
      if (!Array.isArray(data)) return;

      setLugares(data);

      const map = mapRef.current;
      if (!map) return;

      // 🧹 Limpiar marcadores anteriores
      if (lugaresLayerRef.current) {
        lugaresLayerRef.current.clearLayers();
      } else {
        lugaresLayerRef.current = L.layerGroup().addTo(map);
      }

      // 📍 Agregar marcadores de lugares
      data.forEach((lugar: any) => {
        const marker = L.marker(
          [parseFloat(lugar.Latitud), parseFloat(lugar.Longitud)],
          { icon: lugarIcon }
        ).bindPopup(
          `<b>${lugar.Nombre}</b><br>${lugar.Descripcion || "Sin descripción"}`,
          { closeOnClick: false, autoClose: false } // 👈 popup fijo
        );

        marker.addTo(lugaresLayerRef.current!);
        marker.openPopup(); // 👈 abre el popup de inmediato
      });
    } catch (err) {
      console.error("Error cargando lugares:", err);
    }
  };

  // 🗺️ Inicialización del mapa
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = L.map(mapContainerRef.current).setView([5.794425, -73.062991], 17);
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap",
    }).addTo(map);

    cargarLugares();
    iniciarUbicacionUsuario();

    // 🎯 Clicks del mapa
    map.on("click", async (e: any) => {
      const { lat, lng } = e.latlng;

      // 🟢 Si está en modo "crear lugar"
      if (modoCrearLugar) {
        const nombre = prompt("📝 Nombre del lugar:");
        if (!nombre) return alert("Debes ingresar un nombre.");
        const descripcion = prompt("📄 Descripción del lugar:") ?? "";

        try {
          await api.postLugar({
            IdUsuario: USUARIO_SIMULADO_ID,
            Nombre: nombre,
            Descripcion: descripcion,
            Latitud: lat,
            Longitud: lng,
          });

          // 📍 Agregar nuevo marcador al instante con popup fijo
          const nuevo = L.marker([lat, lng], { icon: lugarIcon })
            .addTo(map)
            .bindPopup(`<b>${nombre}</b><br>${descripcion}`, {
              closeOnClick: false,
              autoClose: false,
            })
            .openPopup(); // 👈 se queda abierto

          alert("✅ Lugar creado correctamente.");
          cargarLugares();
        } catch (err) {
          console.error("Error creando lugar:", err);
          alert("❌ Error al crear el lugar: " + (err as any).message);
        } finally {
          setModoCrearLugar(false);
        }
        return;
      }

      // 🟦 Si no está en modo crear → agregar punto a la ruta
      if (!rutaGuardadaId) {
        setPuntos((prev) => [...prev, [lat, lng]]);
      }
    });

    return () => map.remove();
  }, [modoCrearLugar]);

  // ✏️ Dibujar polilínea
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (polylineRef.current) map.removeLayer(polylineRef.current);

    if (puntos.length > 0) {
      polylineRef.current = L.polyline(puntos as L.LatLngExpression[], { color: "blue" }).addTo(map);

      if (puntos.length === 1 && !modoCarga) {
        map.setView(puntos[0], 17);
      } else if (modoCarga) {
        map.fitBounds(polylineRef.current.getBounds());
      }
    }
  }, [puntos, modoCarga]);

  // 📡 Ubicación del usuario (con popup fijo)
  const iniciarUbicacionUsuario = () => {
    const map = mapRef.current;
    if (!navigator.geolocation || !map) return;

    navigator.geolocation.watchPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        if (!marcadorUsuarioRef.current) {
          marcadorUsuarioRef.current = L.marker([latitude, longitude], { icon: batmanIcon })
            .addTo(map)
            .bindPopup("🦇 Tu ubicación", { closeOnClick: false, autoClose: false }) // 👈 popup fijo
            .openPopup();
          map.setView([latitude, longitude], 16);
        } else {
          marcadorUsuarioRef.current.setLatLng([latitude, longitude]);
          marcadorUsuarioRef.current.openPopup();
        }

        try {
          await api.postUbicacion({
            IdUsuario: USUARIO_SIMULADO_ID,
            Latitud: latitude,
            Longitud: longitude,
          });
        } catch (e) {
          console.error("Error guardando ubicación:", e);
        }
      },
      (err) => console.warn("Geolocalización error:", err),
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
    );
  };

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      {/* 🗺️ Contenedor del mapa */}
      <div
        ref={mapContainerRef}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      ></div>

      {/* ⚙️ Footer con controles */}
      <FooterControles
        onGuardar={() => {}}
        onCargar={() => {}}
        onLimpiar={() => {}}
        onSimular={() => {}}
        onCrearLugar={() => {
          setModoCrearLugar(true);
          alert("🟢 Haz clic en el mapa para crear un lugar.");
        }}
        guardando={guardando}
        rutaGuardadaId={rutaGuardadaId}
        puntos={puntos}
      />
    </div>
  );
}
