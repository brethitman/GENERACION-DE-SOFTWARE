import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

export default function CursoPanel() {
  const navigate = useNavigate();
  const [editEnabled, setEditEnabled] = useState(false);

  const topicos = [
    "Introducción a los algoritmos",
    "Variables y Tipos de Datos",
    "Estructuras de Control",
    "Funciones y Procedimientos",
    "Programación Orientada a Objetos",
  ];

  const docentes = ["María López", "Juan Pérez", "Carlos Ramírez"];

  // 🔹 Redirección al panel administrativo
  const handleClick = () => {
    navigate("/panel/admin");
  };

  return (
    <section className="min-h-screen bg-gray-100 px-12 py-10 relative">
      {/* 🔹 Botón Ir a Panel Administrativo (encima de todo) */}
      <div className="flex justify-end mb-6">
        <button
          onClick={handleClick}
          className="flex items-center text-[#7E3132] font-medium hover:underline"
        >
          Ir a Panel Administrativo
          <FaArrowRight className="ml-1" />
        </button>
      </div>

      {/* 🔹 Encabezado principal */}
      <div className="flex justify-between items-start mb-10">
        <div>
          <h2 className="text-sm font-semibold text-gray-800">CURSO</h2>
          <h1 className="text-2xl font-bold text-[#7E3132] uppercase">
            Introducción a la Programación
          </h1>
          <p className="text-sm text-gray-600 mt-1">Descripción del curso...</p>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-gray-800 mb-2">
            DOCENTES EDITORES
          </h2>
          <div className="flex gap-2">
            <button
              className={`px-4 py-1 rounded-md text-sm font-semibold transition ${
                editEnabled
                  ? "bg-[#7E3132] text-white"
                  : "bg-gray-300 text-gray-700 hover:bg-[#7E3132] hover:text-white"
              }`}
              onClick={() => setEditEnabled(true)}
            >
              Habilitar Edición
            </button>
            <button
              className={`px-4 py-1 rounded-md text-sm font-semibold transition ${
                !editEnabled
                  ? "bg-[#7E3132] text-white"
                  : "bg-gray-300 text-gray-700 hover:bg-[#7E3132] hover:text-white"
              }`}
              onClick={() => setEditEnabled(false)}
            >
              Deshabilitar Edición
            </button>
          </div>
        </div>
      </div>

      {/* 🔹 Contenedores principales */}
      <div className="flex justify-between items-start mt-8 gap-6">
        {/* Tópicos */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-300 p-6 w-2/3 min-h-[320px]">
          <h3 className="font-semibold text-gray-800 mb-3">TÓPICOS</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            {topicos.map((t, i) => (
              <li
                key={i}
                className="border-b border-gray-200 pb-1 last:border-none"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Docentes */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-300 p-6 w-1/3 min-h-[320px]">
          <h3 className="font-semibold text-gray-800 mb-3">
            DOCENTES EDITORES
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            {docentes.map((d, i) => (
              <li
                key={i}
                className="border-b border-gray-200 pb-1 last:border-none"
              >
                {d}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
