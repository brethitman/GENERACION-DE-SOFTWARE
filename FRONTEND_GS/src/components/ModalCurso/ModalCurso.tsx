import { useState } from "react";

import api from "../../services/api"; // Importamos el api configurado
import type { Curso } from "../../types/Curso";

interface EditarCursoModalProps {
  id: string;
  abierto: boolean;
  cerrar: () => void;
  curso: Curso;
  actualizar: (cursoActualizado: Curso) => void;
}

export default function EditarCursoModal({
  id,
  abierto,
  cerrar,
  curso,
  actualizar,
}: EditarCursoModalProps) {
  
  const [titulo, setTitulo] = useState(curso.titulo);
  const [descripcion, setDescripcion] = useState(curso.descripcion ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!abierto) return null;

  const handleGuardar = async () => {
    setLoading(true);
    setError(null);

    try {
      // ✅ Reemplazo: Usamos api.put en lugar de fetch
      // No necesitamos headers manuales ni JSON.stringify
      // La URL base ya está configurada en la instancia 'api'
      const { data } = await api.put(`/api/v1/cursos/${id}`, {
        titulo,
        descripcion,
      });

      // Validamos si el backend devuelve un flag de error lógico
      if (data.ok === false) throw new Error(data.mensaje || "Error desconocido");

      // 👉 Extraemos el objeto curso de la respuesta
      actualizar(data.curso);

      cerrar();
    } catch (err: unknown) {
      console.error(err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error desconocido");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-stone-800/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96 space-y-4">
        <h2 className="text-[#7E3132] text-xl font-bold mb-4">Editar curso</h2>

        {error && (
          <p className="text-red-600 text-sm font-medium">{error}</p>
        )}

        <div className="flex flex-col space-y-2">
          <label className="text-sm font-semibold text-gray-600">Nombre del curso</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="border rounded-md px-3 py-2"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-sm font-semibold text-gray-600">Descripción</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="border rounded-md px-3 py-2 h-24"
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={cerrar}
            className="px-4 py-2 rounded bg-stone-200 text-stone-900 hover:bg-stone-300"
            disabled={loading}
          >
            Cancelar
          </button>

          <button
            onClick={handleGuardar}
            className="px-4 py-2 rounded text-white bg-stone-800 hover:bg-stone-700"
            disabled={loading}
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  );
}