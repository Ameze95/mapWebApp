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
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
        <Dialog.Content
          className="fixed inset-0 flex items-center justify-center"
          onInteractOutside={onClose}
          onClick={onClose}
          aria-describedby="info-description"
        >
          <div className="bg-white p-6 rounded shadow-lg relative" onClick={(e) => e.stopPropagation()}>
            <Dialog.Title className="text-xl font-bold mb-4">{contribution.title}</Dialog.Title>
            <Dialog.Description id="info-description" className="sr-only">
              Información detallada sobre la propuesta seleccionada.
            </Dialog.Description>
            <Dialog.Close asChild>
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                onClick={onClose}
              >
                ✕
              </button>
            </Dialog.Close>
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
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default InfoModal;
