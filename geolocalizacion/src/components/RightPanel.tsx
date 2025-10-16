// src/components/RightPanel.tsx
import React from "react";

const RightPanel: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Perfil de usuario</h2>
      <div className="flex flex-col items-center text-center">
        <img
          src="/assets/user.png"
          alt="perfil"
          className="w-20 h-20 rounded-full mb-2"
        />
        <p className="font-medium">Juan Esteban Castañeda Ordo</p>
        <p className="text-sm text-gray-500">@juanesteban</p>
      </div>

      <button className="w-full bg-emerald-500 text-white py-2 rounded hover:bg-emerald-600">
        Editar perfil
      </button>

      <ul className="space-y-3 text-gray-700">
        <li className="flex items-center gap-2 cursor-pointer hover:text-emerald-500">⚙️ Opciones</li>
        <li className="flex items-center gap-2 cursor-pointer hover:text-emerald-500">👥 Amigos</li>
        <li className="flex items-center gap-2 cursor-pointer hover:text-emerald-500">➕ Nuevo grupo</li>
        <li className="flex items-center gap-2 cursor-pointer hover:text-emerald-500">🧰 Soporte</li>
        <li className="flex items-center gap-2 cursor-pointer hover:text-emerald-500">🔗 Compartir</li>
        <li className="flex items-center gap-2 cursor-pointer hover:text-emerald-500">ℹ️ Acerca de</li>
      </ul>
    </div>
  );
};

export default RightPanel;
