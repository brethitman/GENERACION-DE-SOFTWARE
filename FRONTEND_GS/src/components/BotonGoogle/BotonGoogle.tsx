import React from "react";

export const BotonGoogle: React.FC = () => {
  return (
    <button
      type="button"
      className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg px-4 py-2 hover:shadow-md hover:bg-gray-50 transition-all"
    >
      <img
        src="/google-logo.png"
        alt="Google logo"
        className="w-5 h-5"
      />
      <span className="text-gray-700 font-medium">Continuar con Google</span>
    </button>
  );
};
