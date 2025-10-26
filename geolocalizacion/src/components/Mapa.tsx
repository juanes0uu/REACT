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
const USUARIO_SIMULADO_ID = 2;

export default function Mapa() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const [puntos, setPuntos] = useState<[number, number][]>([]);
  const polylineRef = useRef<L.Polyline | null>(null);
  const marcadorUsuarioRef = useRef<L.Marker | null>(null);
  const [guardando, setGuardando] = useState(false);
  const [rutaGuardadaId, setRutaGuardadaId] = useState<number | null>(null);
  const [modoCarga, setModoCarga] = useState(false);
  const [modoCrearLugar, setModoCrearLugar] = useState(false);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = L.map(mapContainerRef.current).setView([5.794425, -73.062991], 17);
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap",
    }).addTo(map);

    // 📍 Captura clics del mapa
    map.on("click", async (e: any) => {
      const { lat, lng } = e.latlng;

      if (modoCrearLugar) {
        const nombre = prompt("📝 Nombre del lugar:");
        if (!nombre) return alert("Debes ingresar un nombre.");
        const descripcion = prompt("📄 Descripción del lugar:") ?? "";

        try {
          const res = await api.postLugar({
            IdUsuario: USUARIO_SIMULADO_ID,
            Nombre: nombre,
            Descripcion: descripcion,
            Latitud: lat,
            Longitud: lng,
          });

          L.marker([lat, lng])
            .addTo(map)
            .bindPopup(`<b>${nombre}</b><br>${descripcion}`)
            .openPopup();

          alert("✅ Lugar creado correctamente.");
        } catch (err) {
          console.error("Error creando lugar:", err);
          alert("❌ Error al crear el lugar: " + (err as any).message);
        } finally {
          setModoCrearLugar(false);
        }
        return;
      }

      // Si está en modo de crear ruta
      if (!rutaGuardadaId) {
        setPuntos((prev) => [...prev, [lat, lng]]);
      }
    });

    iniciarUbicacionUsuario();

    return () => map.remove();
  }, [rutaGuardadaId, modoCrearLugar]);

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

  const guardarRuta = async () => {
    if (puntos.length === 0) return alert("Primero debes marcar una ruta.");
    if (guardando) return;
    if (rutaGuardadaId) return alert("La ruta ya fue guardada (ID: " + rutaGuardadaId + ").");

    setGuardando(true);
    try {
      const nombre = `Ruta - ${new Date().toLocaleString()}`;
      const resRuta = await api.postRuta({ IdUsuario: USUARIO_SIMULADO_ID, Nombre: nombre });

      const idRuta = resRuta.IdRuta ?? (resRuta.ruta?.IdRuta ?? null);
      if (!idRuta) throw new Error("No se pudo obtener el IdRuta.");

      const detalles = puntos.map((pt, idx) =>
        api.postRutaDetalle({ IdRuta: idRuta, Latitud: pt[0], Longitud: pt[1], Orden: idx + 1 })
      );
      await Promise.all(detalles);

      setRutaGuardadaId(idRuta);
      alert(`✅ Ruta guardada correctamente. IdRuta = ${idRuta}`);
    } catch (err) {
      console.error("Error guardando ruta:", err);
      alert("Error al guardar la ruta: " + (err as any).message);
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
      if (!Array.isArray(detalle) || detalle.length === 0) return alert("Esta ruta no tiene puntos.");

      const coords = detalle.map((p: any) => [parseFloat(p.Latitud), parseFloat(p.Longitud)]) as [number, number][];
      setModoCarga(true);
      setPuntos(coords);
      setRutaGuardadaId(id);
      alert(`📍 Ruta ${id} cargada correctamente.`);

      setTimeout(() => setModoCarga(false), 1000);
    } catch (err) {
      console.error("Error cargando ruta:", err);
      alert("Error al cargar la ruta: " + (err as any).message);
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

    {/* 📍 Botones estilizados y centrados abajo */}
    <div
      style={{
        position: "absolute",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: "10px",
        zIndex: 1000,
        background: "rgba(255, 255, 255, 0.9)",
        padding: "10px 15px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        backdropFilter: "blur(6px)",
      }}
    >
      <button
        onClick={guardarRuta}
        disabled={guardando || !!rutaGuardadaId}
        style={{
          padding: "8px 14px",
          borderRadius: "8px",
          border: "none",
          cursor: guardando ? "not-allowed" : "pointer",
          backgroundColor: guardando
            ? "#b0bec5"
            : rutaGuardadaId
            ? "#81c784"
            : "#2196f3",
          color: "white",
          fontWeight: "bold",
          transition: "0.2s",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "#1976d2")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = guardando
            ? "#b0bec5"
            : rutaGuardadaId
            ? "#81c784"
            : "#2196f3")
        }
      >
        {guardando
          ? "Guardando..."
          : rutaGuardadaId
          ? `✅ Guardada (${rutaGuardadaId})`
          : "💾 Guardar"}
      </button>

      <button
        onClick={cargarRuta}
        style={{
          padding: "8px 14px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          backgroundColor: "#ffb300",
          color: "white",
          fontWeight: "bold",
          transition: "0.2s",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "#ffa000")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "#ffb300")
        }
      >
        📂 Cargar
      </button>

      <button
        onClick={limpiarRuta}
        disabled={guardando || !!rutaGuardadaId}
        style={{
          padding: "8px 14px",
          borderRadius: "8px",
          border: "none",
          cursor: guardando ? "not-allowed" : "pointer",
          backgroundColor: "#ef5350",
          color: "white",
          fontWeight: "bold",
          transition: "0.2s",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "#e53935")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "#ef5350")
        }
      >
        🧹 Limpiar
      </button>

      <button
        onClick={simular}
        disabled={puntos.length === 0}
        style={{
          padding: "8px 14px",
          borderRadius: "8px",
          border: "none",
          cursor: puntos.length === 0 ? "not-allowed" : "pointer",
          backgroundColor: "#8e24aa",
          color: "white",
          fontWeight: "bold",
          transition: "0.2s",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "#6a1b9a")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "#8e24aa")
        }
      >
        ▶️ Simular
      </button>

      <button
        onClick={() => {
          setModoCrearLugar(true);
          alert("🟢 Haz clic en el mapa para crear un lugar.");
        }}
        style={{
          padding: "8px 14px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          backgroundColor: "#43a047",
          color: "white",
          fontWeight: "bold",
          transition: "0.2s",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "#2e7d32")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "#43a047")
        }
      >
        📍 Lugar
      </button>
    </div>
  </div>
);

}
