// src/components/Router/Router.tsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../Layout/Layout';
import Home from '../../pages/Home';
import UserPage from '../../pages/UserPage';
import RegisterPage from '../../pages/Register';
import LoginPage from '../../pages/Login';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="user" element={<UserPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
