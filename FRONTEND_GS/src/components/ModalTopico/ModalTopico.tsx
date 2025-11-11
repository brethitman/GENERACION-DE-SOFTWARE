// src/components/CrearTopicoModal.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import type { Topico } from "../../services/topicos";
import { fetchTopicos } from "../../services/topicos";

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
  //const irCrearTopico = () => { navigate("/editar-topico"); };

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
    const res = await fetch("http://localhost:3000/topicos/insertar-despues", {
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
        <h2 className="text-lg font-semibold mb-4">Crear nuevo tópico</h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <label className="block mb-3">
          <span className="block text-sm font-medium text-gray-700">Título del tópico</span>
          <input
            type="text"
            className="w-full border rounded px-2 py-1 mt-1 focus:ring-2 focus:ring-blue-400"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </label>

        <label className="block mb-4">
          <span className="block text-sm font-medium text-gray-700">
            Insertar después de:
          </span>
          <select
            className="w-full border rounded px-2 py-1 mt-1"
            value={afterTopicoId ?? ""}
            onChange={(e) => setAfterTopicoId(e.target.value || null)}
          >
            <option value="">Al inicio</option>
            {topicos.map((t) => (
              <option key={t.id} value={t.id}>
                {t.titulo}
              </option>
            ))}
          </select>
        </label>

        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 rounded border"
            onClick={onClose}
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
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

