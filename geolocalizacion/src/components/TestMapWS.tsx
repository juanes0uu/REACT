import { MapContainer, TileLayer, Polyline, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState, useRef } from "react";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function MoveMap({ position }: { position: [number, number] }) {
  const map = useMap();

  useEffect(() => {
    if (position) map.setView(position, 17, { animate: true });
  }, [position]);

  return null;
}

export default function TestMapWS() {
  const [positions, setPositions] = useState<[number, number][]>([]);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080/ws");
    wsRef.current = ws;

    ws.onopen = () => console.log("WS conectado desde React ✔");

    ws.onmessage = (event) => {
      let payload;
      try {
        payload = JSON.parse(event.data);
      } catch {
        console.warn("Mensaje WS inválido.");
        return;
      }

      if (payload.type === "update" && payload.position) {
        const { lat, lng } = payload.position;
        setPositions((prev) => [...prev, [lat, lng]]);
      }
    };

    ws.onclose = () => console.log("WS cerrado");

    return () => ws.close();
  }, []);

  // 👉 Enviar ubicación manual al WS
  const enviarUbicacion = () => {
    if (!wsRef.current) return;

    const lat = 5.793 + Math.random() * 0.01;
    const lng = -73.062 + Math.random() * 0.01;

    const msg = {
      type: "location",
      userId: "reactUser",
      position: { lat, lng },
    };

    wsRef.current.send(JSON.stringify(msg));
    console.log("Ubicación enviada:", msg);
  };

  const lastPos = positions[positions.length - 1];

  return (
    <div style={{ height: "100vh" }}>
      <h2 style={{ padding: 10 }}>Prueba de WebSocket + Mapa</h2>

      <button
        onClick={enviarUbicacion}
        style={{
          margin: 10,
          padding: "10px 20px",
          background: "green",
          color: "white",
          borderRadius: 6,
          border: "none",
          cursor: "pointer"
        }}
      >
        Enviar ubicación de prueba
      </button>

      <MapContainer
        center={[5.79418, -73.06281]}
        zoom={16}
        style={{ height: "80%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {lastPos && <MoveMap position={lastPos} />}
        {positions.length > 1 && (
          <Polyline positions={positions} weight={4} color="blue" />
        )}
        {lastPos && <Marker position={lastPos} />}
      </MapContainer>
    </div>
  );
}
