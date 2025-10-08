import React from "react";
import MapView from "../components/MapView";

export default function Dashboard() {
    return (
        <div
        style={{
            height: "100vh",
            width: "100vw",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
        }}
        >
        <header
            style={{
            padding: 12,
            background: "#00994d",
            color: "#fff",
            textAlign: "center",
            fontWeight: "bold",
            flexShrink: 0,
            }}
        >
            <h2>Recorrido Ciudadela</h2>
        </header>

        {/* 👇 aquí el mapa ocupa TODO */}
        <div
            style={{
            flex: 1,
            position: "relative",
            width: "100%",
            height: "100%",
            }}
        >
            <MapView />
        </div>
        </div>
    );
}
