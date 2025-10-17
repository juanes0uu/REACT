// src/components/LeftSidebar.tsx
import React from "react";

const LeftSidebar: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold mb-4">Instrucciones</h2>

      <div className="space-y-3">
        <select className="w-full p-2 rounded text-black">
          <option>Elige el tipo de partida</option>
        </select>
        <select className="w-full p-2 rounded text-black">
          <option>Elige el destino</option>
        </select>
        <button className="w-full bg-emerald-500 text-white py-2 rounded hover:bg-emerald-600">
          Iniciar recorrido
        </button>
      </div>

      <div className="mt-6 border-t border-gray-700 pt-4">
        <p className="text-sm text-gray-400">Selecciona puntos en el mapa para crear una ruta.</p>
      </div>
    </div>
  );
};

export default LeftSidebar;
