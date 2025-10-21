import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-stone-800/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-lg">
        <h2 className="text-[#7E3132] text-xl font-bold mb-4">{title}</h2>
        <div className="mb-6">{children}</div>
        <button
          onClick={onClose}
          className="bg-stone-800 hover:bg-stone-700 text-white font-semibold px-4 py-2 rounded-lg"
        >
          Entendido
        </button>
      </div>
    </div>
  );
};

export default Modal;
