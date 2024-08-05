// src/components/Layout/Layout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow mt-16"> {/* Ajusta el margen superior para el espacio del Navbar */}
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
