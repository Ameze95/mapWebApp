// src/components/Map/ContributionModal.tsx
import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

interface ContributionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; description: string }) => void;
}

const ContributionModal: React.FC<ContributionModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    onSubmit({ title, description });
    onClose();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
        <Dialog.Content
          className="fixed inset-0 flex items-center justify-center"
          onInteractOutside={onClose}
          onClick={onClose}
          aria-describedby="contribution-description"
        >
          <div className="bg-white p-6 rounded shadow-lg relative" onClick={(e) => e.stopPropagation()}>
            <Dialog.Title className="text-xl font-bold mb-4">Nueva Propuesta</Dialog.Title>
            <Dialog.Description id="contribution-description" className="sr-only">
              Formulario para crear una nueva propuesta.
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
              <label className="block text-sm font-medium mb-1">Título</label>
              <input
                type="text"
                className="w-full border p-2 rounded"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Descripción</label>
              <textarea
                className="w-full border p-2 rounded"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <button
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                onClick={handleSubmit}
              >
                Iniciar
              </button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ContributionModal;
