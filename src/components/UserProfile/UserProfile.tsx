// src/components/UserProfile/UserProfile.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

const UserProfile: React.FC = () => {
  return (
    <div className="relative">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className="flex items-center space-x-2">
            <img
              src="https://via.placeholder.com/40"
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className="bg-white shadow-lg rounded p-2">
          <DropdownMenu.Item asChild>
            <Link to="/user" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
              Página de Usuario
            </Link>
          </DropdownMenu.Item>
          {/* Puedes añadir más opciones aquí */}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
};

export default UserProfile;
