// src/components/HeaderBar.tsx
import React from "react";

const HeaderBar: React.FC = () => {
  return (
    <header className="bg-white shadow-sm px-4 py-3 flex items-center justify-between">
      <h1 className="text-lg font-semibold text-gray-700">Mapa Interactivo</h1>

      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600"></span>
        <img
          src="/assets/user.png"
          alt="usuario"
          className="w-9 h-9 rounded-full border"
        />
      </div>
    </header>
  );
};

export default HeaderBar;
