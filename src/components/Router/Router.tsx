import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from '../../../supabase/AuthContext';


import Layout from '../Layout/Layout';
import LoginPage from '../../pages/Login';  
import RegisterPage from '../../pages/Register';
import HomePage from '../../pages/Home';
import UserPage from '../../pages/UserPage';
import ProtectedRoute from './ProtectedRoute';




const AppRouter: React.FC = () => {
  const { session } = useAuth();

  return (
    <Router >
      <Routes  >
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/userPage" element={<UserPage />} />
          </Route>
        </Route>  
      </Routes>
    </Router>
  );
};

export default AppRouter;
