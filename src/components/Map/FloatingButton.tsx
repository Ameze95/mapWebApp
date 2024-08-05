// src/components/Map/FloatingButton.tsx
import React from 'react';

interface FloatingButtonProps {
  onClick: () => void;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ onClick }) => {
  return (
    <button
      className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600"
      onClick={onClick}
    >
      + Contribuir
    </button>
  );
};

export default FloatingButton;
