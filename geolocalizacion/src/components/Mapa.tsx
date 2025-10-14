import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { api } from "../services/api";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import batmanImg from "../assets/batman.png";

// 🔧 Fix de íconos
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// 🦇 Icono personalizado
const batmanIcon = L.icon({
  iconUrl: batmanImg,
  iconSize: [48, 48],
  iconAnchor: [24, 48],
  popupAnchor: [0, -45],
});

// 👤 Simulación de usuario logueado
const USUARIO_SIMULADO_ID = 1;

export default function Mapa() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const [puntos, setPuntos] = useState<[number, number][]>([]);
  const polylineRef = useRef<L.Polyline | null>(null);
  const marcadorUsuarioRef = useRef<L.Marker | null>(null);
  const [guardando, setGuardando] = useState(false);
  const [rutaGuardadaId, setRutaGuardadaId] = useState<number | null>(null);
  const [modoCarga, setModoCarga] = useState(false); // 🧠 Nuevo: modo carga

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = L.map(mapContainerRef.current).setView([5.794425, -73.062991], 17);
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap",
    }).addTo(map);

    // 📍 Captura clics para crear puntos de la ruta
    map.on("click", (e: any) => {
      if (rutaGuardadaId) return;
      const { lat, lng } = e.latlng;
      setPuntos((prev) => [...prev, [lat, lng]]);
    });

    iniciarUbicacionUsuario();

    return () => map.remove();
  }, [rutaGuardadaId]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (polylineRef.current) map.removeLayer(polylineRef.current);
    if (puntos.length > 0) {
      polylineRef.current = L.polyline(puntos as L.LatLngExpression[], { color: "blue" }).addTo(map);

      // 👇 Controla el zoom: solo ajusta cuando se carga una ruta
      if (puntos.length === 1 && !modoCarga) {
        map.setView(puntos[0], 17);
      } else if (modoCarga) {
        map.fitBounds(polylineRef.current.getBounds());
      }
    }
  }, [puntos, modoCarga]);

  const guardarRuta = async () => {
    if (puntos.length === 0) return alert("Primero debes marcar una ruta.");
    if (guardando) return;
    if (rutaGuardadaId) return alert("La ruta ya fue guardada (ID: " + rutaGuardadaId + ").");

    setGuardando(true);
    try {
      const nombre = `Ruta - ${new Date().toLocaleString()}`;
      const resRuta = await api.postRuta({ IdUsuario: USUARIO_SIMULADO_ID, Nombre: nombre });

      const idRuta = resRuta.IdRuta ?? (resRuta.ruta?.IdRuta ?? null);
      if (!idRuta) throw new Error("No se pudo obtener el IdRuta desde la respuesta del servidor.");

      const detalles = puntos.map((pt, idx) =>
        api.postRutaDetalle({ IdRuta: idRuta, Latitud: pt[0], Longitud: pt[1], Orden: idx + 1 })
      );
      await Promise.all(detalles);

      setRutaGuardadaId(idRuta);
      alert(`✅ Ruta guardada correctamente. IdRuta = ${idRuta}`);
    } catch (err) {
      console.error("Error guardando ruta:", err);
      alert("Error al guardar la ruta: " + (err as any).message || err);
    } finally {
      setGuardando(false);
    }
  };

  const cargarRuta = async () => {
    try {
      const rutas = await api.getRutas();
      if (!Array.isArray(rutas) || rutas.length === 0) return alert("No hay rutas guardadas.");

      const lista = rutas.map((r: any) => `${r.IdRuta}: ${r.Nombre}`).join("\n");
      const input = prompt(`Selecciona el ID de la ruta:\n${lista}`);
      const id = Number(input);
      if (!id || isNaN(id)) return;

      const detalle = await api.getRutaDetalle(id);
      if (!Array.isArray(detalle) || detalle.length === 0) return alert("Esta ruta no tiene puntos guardados.");

      const coords = detalle.map((p: any) => [parseFloat(p.Latitud), parseFloat(p.Longitud)]) as [number, number][];
      setModoCarga(true); // 🔥 activar modo carga
      setPuntos(coords);
      setRutaGuardadaId(id);
      alert(`📍 Ruta ${id} cargada correctamente.`);

      // volver al modo normal luego de ajustar vista
      setTimeout(() => setModoCarga(false), 1000);
    } catch (err) {
      console.error("Error cargando ruta:", err);
      alert("Error al cargar la ruta: " + (err as any).message || err);
    }
  };

  const simular = () => {
    const map = mapRef.current;
    if (!map || puntos.length === 0) return alert("No hay ruta definida.");
    let i = 0;
    const marcador = L.marker(puntos[0] as L.LatLngExpression).addTo(map);
    const intervalo = setInterval(() => {
      if (i >= puntos.length) {
        clearInterval(intervalo);
        marcador.bindPopup("🚩 Llegó al destino").openPopup();
        return;
      }
      marcador.setLatLng(puntos[i]);
      i++;
    }, 800);
  };

  const iniciarUbicacionUsuario = () => {
    const map = mapRef.current;
    if (!navigator.geolocation || !map) return;

    navigator.geolocation.watchPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        if (!marcadorUsuarioRef.current) {
          marcadorUsuarioRef.current = L.marker([latitude, longitude], { icon: batmanIcon })
            .addTo(map)
            .bindPopup("🦇 Tu ubicación")
            .openPopup();
          map.setView([latitude, longitude], 16);
        } else {
          marcadorUsuarioRef.current.setLatLng([latitude, longitude]);
        }
        try {
          await api.postUbicacion({ IdUsuario: USUARIO_SIMULADO_ID, Latitud: latitude, Longitud: longitude });
        } catch (e) {
          console.error("Error guardando ubicación:", e);
        }
      },
      (err) => console.warn("Geolocalización error:", err),
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
    );
  };

  const limpiarRuta = () => {
    if (rutaGuardadaId) return alert("La ruta ya fue guardada. Recarga para crear una nueva.");
    setPuntos([]);
    if (polylineRef.current) {
      const map = mapRef.current;
      if (map) map.removeLayer(polylineRef.current);
      polylineRef.current = null;
    }
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div ref={mapContainerRef} id="map" style={{ width: "100%", height: "100%" }}></div>

      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          background: "white",
          padding: "10px",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          zIndex: 1000,
          display: "flex",
          gap: 8,
        }}
      >
        <button onClick={guardarRuta} disabled={guardando || !!rutaGuardadaId}>
          {guardando ? "Guardando..." : rutaGuardadaId ? `Guardada (ID ${rutaGuardadaId})` : "💾 Guardar ruta"}
        </button>
        <button onClick={cargarRuta}>📂 Cargar ruta</button>
        <button onClick={limpiarRuta} disabled={guardando || !!rutaGuardadaId}>
          🧹 Limpiar
        </button>
        <button onClick={simular} disabled={puntos.length === 0}>
          ▶️ Simular recorrido
        </button>
      </div>
    </div>
  );
}
