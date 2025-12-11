// src/components/CrearTopicoModal.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { fetchTopicos } from "../../services/topicos";
import type { Topico } from "../../types/Topico";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onCreated: (nuevoTopico: Topico) => void;
  idCurso: string;
};

export default function CrearTopicoModal({ isOpen, onClose, onCreated, idCurso }: Props) {
  const [titulo, setTitulo] = useState("");
  const [topicos, setTopicos] = useState<Topico[]>([]);
  const [afterTopicoId, setAfterTopicoId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) return;
    setError(null);
    // Cargar los tópicos existentes del curso, ordenados
    fetchTopicos()
      .then((data) => {
        const filtrados = data
          .filter((t) => t.idCurso === idCurso)
          .sort((a, b) => a.orden - b.orden);
        setTopicos(filtrados);
            
         if (filtrados.length > 0) {
           setAfterTopicoId(filtrados[filtrados.length - 1].id);
         } else {
           setAfterTopicoId(null);
         }
      })
      .catch((err) => setError(err.message));
  }, [isOpen, idCurso]);
  

const handleSubmit = async () => {
  if (!titulo.trim()) {
    alert("El título es obligatorio");
    return;
  }

  setLoading(true);
  try {
    const res = await fetch("https://generacionback.vercel.app/api/v1/topicos/insertar-despues", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        idCurso,
        titulo: titulo.trim(),
        contenido: {},
        afterTopicoId,
      }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.mensaje || "Error al crear el tópico");

    onCreated(data.topico);  // opcional si quieres actualizar lista en padre
    setTitulo("");
    setAfterTopicoId(null);

    // Navegar directamente a EditarMenu con el ID del tópico creado
    navigate(`/editar-topico/${data.topico.id}`);

    onClose();
  } catch (e: unknown) {
  if (e instanceof Error) {
    setError(e.message);
  } else {
    setError(String(e));
  }
} finally {
    setLoading(false);
  }
};


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-stone-800/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-96 p-6 shadow-lg">
        <h2 className="text-[#7E3132] text-xl font-bold mb-4">Crear nuevo tópico</h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <label className="block mb-3">
          <label className="text-sm font-semibold text-gray-600">Nombre del Topico</label>
          <input
            type="text"
            className="w-full border rounded px-2 py-1 mt-1 focus:ring-2 focus:ring-blue-400"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </label>

        <label className="block mb-4">
          <label className="text-sm font-semibold text-gray-600">Insertar despues de:</label>
          <select
            className="w-full border rounded px-2 py-1 mt-1"
            value={afterTopicoId ?? ""}
            onChange={(e) => setAfterTopicoId(e.target.value || null)}
          >
            <option value="">Al final</option>
            {topicos.map((t) => (
              <option key={t.id} value={t.id}>
                {t.titulo}
              </option>
            ))}
          </select>
        </label>

        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 rounded bg-stone-200 text-stone-900 hover:bg-stone-300"
            onClick={onClose}
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 rounded text-white bg-stone-800 hover:bg-stone-700"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Creando..." : "Crear"}
          </button>
        </div>
      </div>
    </div>
  );
}

