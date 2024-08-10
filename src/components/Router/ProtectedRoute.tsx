import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useAuth } from '../../../supabase/AuthContext';

const ProtectedRoute = () => {
  const { session } = useAuth();
  const isSessionStoredInCookies = Cookies.get('userSession');

  // Verifica si existe la sesión en el contexto y en las cookies
  if (!session && !isSessionStoredInCookies) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />; // Renderiza los componentes hijos
};

export default ProtectedRoute;