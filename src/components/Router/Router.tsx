import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from '../../../supabase/AuthContext';
import Layout from '../Layout/Layout';
import LoginPage from '../../pages/Login';  
import RegisterPage from '../../pages/Register';
import HomePage from '../../pages/Home';

const AppRouter: React.FC = () => {
  const { session } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={session ? <Layout /> : <Navigate to="/login" />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
