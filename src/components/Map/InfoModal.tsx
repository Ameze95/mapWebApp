// src/components/Map/InfoModal.tsx
import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';

interface Contribution {
  title: string;
  description: string;
  latitude: number;
  longitude: number;
}

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  contribution: Contribution;
}

const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose, contribution }) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
      <Dialog.Content
        className="fixed inset-0 flex items-center justify-center"
        onInteractOutside={onClose} // Permitir el cierre al hacer clic fuera del contenido
      >
        <div className="bg-white p-6 rounded shadow-lg">
          <Dialog.Title className="text-xl font-bold mb-4">{contribution.title}</Dialog.Title>
          <div className="mb-4">
            <p>{contribution.description}</p>
          </div>
          <div className="flex justify-end">
            <button
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              onClick={onClose}
            >
              Cerrar
            </button>
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default InfoModal;
