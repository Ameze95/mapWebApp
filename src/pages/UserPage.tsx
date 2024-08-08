import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../supabase/AuthContext';
import { supabase } from '../../supabase/supabaseClient';

const UserPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useAuth

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-primary mb-4">Página de Usuario</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <p className="text-secondary">Información del usuario aquí.</p>
          <div className="flex justify-between mt-4">
            <button className="px-4 py-2 bg-green-500 text-white rounded-md" onClick={() => navigate('/')}>Go Home</button>
            <button className="px-4 py-2 bg-red-500 text-white rounded-md" onClick={() => supabase.auth.signOut()}>Logout</button>
          </div>
      </div>
    </div>
  );
};

export default UserPage;
