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
      <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
      <Dialog.Content
        className="fixed inset-0 flex items-center justify-center"
        onInteractOutside={onClose} // Permitir el cierre al hacer clic fuera del contenido
      >
        <div className="bg-white p-6 rounded shadow-lg">
          <Dialog.Title className="text-xl font-bold mb-4">Nueva Propuesta</Dialog.Title>
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
    </Dialog.Root>
  );
};

export default ContributionModal;
