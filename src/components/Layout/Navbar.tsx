// src/components/Layout/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import UserProfile from '../UserProfile/UserProfile';

const Navbar: React.FC = () => {
  return (
    <NavigationMenu.Root className="bg-gradient-to-br from-blue-400 to-fuchsia-500 background-animate text-white p-4 fixed top-0 left-0 right-0 z-10 flex justify-between items-center">
      <NavigationMenu.List className="flex space-x-4">
        <NavigationMenu.Item>
          <NavigationMenu.Link asChild>
            <Link to="/userPage" className="hover:text-gray-300">Home</Link>
          </NavigationMenu.Link>
        </NavigationMenu.Item>
        {/* Añade más elementos de navegación aquí en el futuro */}
      </NavigationMenu.List>
      <UserProfile />
    </NavigationMenu.Root>
  );
};

export default Navbar;
