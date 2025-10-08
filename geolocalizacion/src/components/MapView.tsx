import React, { useEffect, useMemo, useState } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    Polyline,
    useMap,
} from "react-leaflet";
import L from "leaflet";
import avatarImg from "../assets/batman.png";
import { api } from "../services/api";
import { wsService } from "../services/ws";
import type { Lugar, RutaDetalle } from "../types";

const AvatarIcon = new L.Icon({
    iconUrl: avatarImg,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
});

function CenterMap({ center }: { center: [number, number] }) {
    const map = useMap();
    useEffect(() => {
        map.setView(center, map.getZoom());
    }, [center, map]);
    return null;
}

export default function MapView() {
    const [lugares, setLugares] = useState<Lugar[]>([]);
    const [rutaPuntos, setRutaPuntos] = useState<RutaDetalle[]>([]);
    const [userPos, setUserPos] = useState<[number, number] | null>(null);
    const [started, setStarted] = useState(false);
    const userId = 1;

    const polyline = useMemo(() => {
        return rutaPuntos
        .slice()
        .sort((a, b) => a.Orden - b.Orden)
        .map((p) => [p.Latitud, p.Longitud] as [number, number]);
    }, [rutaPuntos]);

    useEffect(() => {
        (async () => {
        try {
            const l = await api.getLugares();
            setLugares(l.data ?? l);
        } catch (err) {
            console.error("Error fetching lugares", err);
        }

        try {
            const detalle = await api.getRutaDetalle(1);
            setRutaPuntos(detalle.data ?? detalle);
        } catch (err) {
            console.error("Error fetching ruta detalle", err);
        }
        })();
    }, []);

    useEffect(() => {
        if (!started) return;
        wsService.connect(userId);
        wsService.onMessage((m) => console.log("WS msg", m));

        let watcherId: number | null = null;
        if ("geolocation" in navigator) {
        watcherId = navigator.geolocation.watchPosition(
            (pos) => {
            const coords: [number, number] = [
                pos.coords.latitude,
                pos.coords.longitude,
            ];
            setUserPos(coords);
            wsService.send({
                type: "ubicacion",
                idUsuario: userId,
                lat: coords[0],
                lng: coords[1],
                timestamp: new Date().toISOString(),
            });
            },
            (err) => console.error("geolocation error", err),
            { enableHighAccuracy: true, maximumAge: 3000, timeout: 5000 }
        );
        } else {
        console.warn("Geolocation no disponible en este navegador");
        }

        return () => {
        if (watcherId !== null) navigator.geolocation.clearWatch(watcherId);
        wsService.close();
        };
    }, [started]);

    const center: [number, number] =
        polyline.length > 0
        ? polyline[Math.floor(polyline.length / 2)]
        : userPos ?? [5.7925156193637815, -73.06376127888508];
        

    return (
        <div
        style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
        }}
        >
        {/* 📍 Mapa principal */}
        <MapContainer
            center={center}
            zoom={16}
            style={{ height: "100%", width: "100%" }}
        >
            <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <CenterMap center={center} />

            {polyline.length > 0 && (
            <Polyline positions={polyline} color="#007bff" weight={5} />
            )}

            {lugares.map((l) => (
            <Marker key={l.IdLugar} position={[l.Latitud, l.Longitud]}>
                <Popup>
                <strong>{l.Nombre}</strong>
                <br />
                {l.Descripcion}
                </Popup>
            </Marker>
            ))}

            {userPos && (
            <Marker position={userPos} icon={AvatarIcon}>
                <Popup>Tu ubicación</Popup>
            </Marker>
            )}
        </MapContainer>

        {/* 🟢 Botón flotante moderno */}
        <button
        onClick={() => setStarted((s) => !s)}
        style={{
            position: "fixed",
            bottom: "90px",
            left: "50%",
            transform: "translateX(-50%)",
            padding: "14px 28px",
            borderRadius: "30px",
            border: "none",
            background: started ? "#dc3545" : "#198754",
            color: "#fff",
            fontWeight: 600,
            fontSize: "15px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
            cursor: "pointer",
            transition: "all 0.3s ease",
            zIndex: 2000,
        }}
        onMouseEnter={(e) =>
            ((e.target as HTMLButtonElement).style.transform =
            "translateX(-50%) scale(1.05)")
        }
        onMouseLeave={(e) =>
            ((e.target as HTMLButtonElement).style.transform =
            "translateX(-50%) scale(1)")
        }
        >
        {started ? "■ Detener recorrido" : "▶ Iniciar recorrido"}
        </button>

        </div>
    );
}
