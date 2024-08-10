import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../supabase/AuthContext';
import { supabase } from '../../supabase/supabaseClient';

const UserPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };


  return (
    <div className="flex flex-col items-center justify-center pt-10 min-h-screenbg-gradient-to-br from-blue-700 via-blue-200 via-fuchsia-300 to-fuchsia-700">
      <h1 className="text-4xl font-bold text-slate-700 mb-4">Página de Usuario</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <p className="text-black">Información del usuario aquí.</p>
        <p className="text-gray-500">Email: {user?.email}</p>
        <p className="text-gray-500">Nombre: {user?.user_metadata.full_name}</p>
        <p className="text-gray-500">ID: {user?.id}</p>
        <p className="text-gray-500">Rol: {user?.role}</p>
        <p className="text-gray-500">Proveedores: {user?.app_metadata.providers}</p>
        <p className="text-gray-500">Actualizado: {user?.updated_at}</p>
        <p className="text-gray-500">Creado: {user?.created_at}</p>
        
          <div className="flex justify-between mt-4">
            <button className="px-4 py-2 bg-cyan-200 text-white rounded-md" onClick={() => navigate('/')}>Back</button>
            <button className="px-4 py-2 bg-blue-400 text-white rounded-md" onClick={() => signOut()} >Logout</button>
          </div>
      </div>
    </div>
  );
};

export default UserPage;
