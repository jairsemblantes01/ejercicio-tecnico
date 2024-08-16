import React, { useState } from "react";
import ConfirmationModal from "./ConfirmModal";

interface DropdownProps {
  onEdit: () => void;
  onDelete: () => void;
  deleteItem: string;
}

export default function ActionSelect({ onEdit, onDelete, deleteItem }: DropdownProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = () => {
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    setIsModalOpen(false);
    onDelete();
  };

  return (
    <div className="dropdown">
      <button className="dropdown-button">⋮</button>
      <div className="dropdown-content">
        <button onClick={onEdit}>Editar</button>
        <button onClick={handleDelete}>Eliminar</button>
      </div>

      <ConfirmationModal
        title="Confirmar eliminación"
        message={`Estás seguro que deseas eliminar el producto ${deleteItem}?`}
        isOpen={isModalOpen}
        confirmText={"Confirmar"}
        cancelText={"Cancelar"}
        onConfirm={confirmDelete}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
}
