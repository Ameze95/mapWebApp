// src/pages/UserPage.tsx
import React from 'react';

const UserPage: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Perfil de Usuario</h1>
      <div className="flex items-center space-x-4">
        <img
          src="https://via.placeholder.com/100"
          alt="Profile"
          className="w-24 h-24 rounded-full"
        />
        <div>
          <h2 className="text-xl">Nombre del Usuario</h2>
          <p className="text-gray-600">Otra información del usuario</p>
        </div>
      </div>
      {/* Aquí puedes añadir más información del usuario */}
    </div>
  );
};

export default UserPage;
