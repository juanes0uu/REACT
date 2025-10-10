import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// 🔧 Corrige los íconos por defecto de Leaflet (bug con Vite)
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function Mapa() {
  const mapRef = useRef<L.Map | null>(null);
  const [puntos, setPuntos] = useState<[number, number][]>([]);
  const polylineRef = useRef<L.Polyline | null>(null);
  const marcadorSimuladoRef = useRef<L.Marker | null>(null);
  const marcadorUsuarioRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    // Inicializa el mapa
    const map = L.map("map").setView([5.79376, -73.06363], 17);
    mapRef.current = map;

    // Capa base
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap",
    }).addTo(map);

    // Evento de clic para añadir puntos
    map.on("click", (e: any) => {
      const { lat, lng } = e.latlng;
      setPuntos((prev) => [...prev, [lat, lng]]);
      L.marker([lat, lng]).addTo(map).bindPopup(`Punto ${puntos.length + 1}`);
    });

    return () => {
      map.remove(); // Limpia el mapa al desmontar
    };
  }, []);

  // Dibuja la ruta cada vez que cambian los puntos
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (polylineRef.current) map.removeLayer(polylineRef.current);
    if (puntos.length > 1) {
      polylineRef.current = L.polyline(puntos, { color: "blue" }).addTo(map);
    }
  }, [puntos]);

  // Funciones de botones
  const guardarRuta = () => {
    if (puntos.length === 0) return alert("Primero debes marcar una ruta.");
    localStorage.setItem("rutaGuardada", JSON.stringify(puntos));
    alert("✅ Ruta guardada correctamente.");
  };

  const cargarRuta = () => {
    const data = localStorage.getItem("rutaGuardada");
    if (!data) return alert("No hay ruta guardada.");
    const ruta = JSON.parse(data);
    setPuntos(ruta);
    const map = mapRef.current;
    if (map) {
      if (polylineRef.current) map.removeLayer(polylineRef.current);
      polylineRef.current = L.polyline(ruta, { color: "blue" }).addTo(map);
      map.fitBounds(polylineRef.current.getBounds());
    }
  };

  const simular = () => {
    const map = mapRef.current;
    if (!map || puntos.length === 0) return alert("No hay ruta definida.");
    if (marcadorSimuladoRef.current) map.removeLayer(marcadorSimuladoRef.current);

    let i = 0;
    marcadorSimuladoRef.current = L.marker(puntos[0]).addTo(map);
    const intervalo = setInterval(() => {
      if (i >= puntos.length) {
        clearInterval(intervalo);
        marcadorSimuladoRef.current?.bindPopup("🚩 Llegó al destino").openPopup();
        return;
      }
      marcadorSimuladoRef.current?.setLatLng(puntos[i]);
      i++;
    }, 1000);
  };

  const miUbicacion = () => {
    const map = mapRef.current;
    if (!navigator.geolocation || !map) return alert("Tu navegador no soporta geolocalización.");

    navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        if (!marcadorUsuarioRef.current) {
          marcadorUsuarioRef.current = L.marker([latitude, longitude])
            .addTo(map)
            .bindPopup("📍 Tú estás aquí")
            .openPopup();
          map.setView([latitude, longitude], 15);
        } else {
          marcadorUsuarioRef.current.setLatLng([latitude, longitude]);
        }
      },
      (err) => alert("Error obteniendo ubicación: " + err.message),
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
    );
  };

  return (
    <div style={{ position: "relative" }}>
      <div id="map" style={{ height: "100vh", width: "100%" }}></div>

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
        }}
      >
        <button onClick={guardarRuta}>💾 Guardar ruta</button>
        <button onClick={cargarRuta}>📂 Cargar ruta</button>
        <button onClick={simular}>▶️ Simular recorrido</button>
        <button onClick={miUbicacion}>📍 Mi ubicación</button>
      </div>
    </div>
  );
}
