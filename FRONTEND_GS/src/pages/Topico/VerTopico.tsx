import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchTopicoPorId } from "../../services/topicos";
import type { Bloque } from "../../types/Topico";

import BloqueSoloLectura from "./BloqueSoloLectura";

interface TopicoConId {
  titulo: string;
  contenido?: { bloques: Bloque[] };
}

export default function VerTopico() {
  const { id } = useParams<{ id?: string }>();
  const [topico, setTopico] = useState<TopicoConId | null>(null);
  const [error, setError] = useState<string | null>(null);

  // --- Cargar el tópico ---
  useEffect(() => {
    if (!id) return;

    fetchTopicoPorId(id)
      .then((data) => setTopico(data as TopicoConId))
      .catch((e: unknown) => {
        if (e instanceof Error) setError(e.message);
        else setError(String(e));
      });
  }, [id]);

  if (error) return <div className="text-red-500 p-6">Error: {error}</div>;
  if (!topico) return <div className="text-gray-500 p-6">Cargando tópico...</div>;

  return (
    <div className="h-[calc(100vh-125px)] flex flex-col items-center justify-start bg-gray-50 p-8 overflow-hidden">
      {/* Título siempre visible */}
      <h1 className="text-2xl font-bold text-[#7E3132] mb-6">{topico.titulo}</h1>

      {/* Contenedor de bloques en columnas */}
      <div className="max-w-6xl grid grid-cols-1 sm:grid-cols-2 gap-6">
        {topico.contenido?.bloques.map((bloque, i) => (
          <BloqueSoloLectura key={i} bloque={bloque} />
        ))}
      </div>
    </div>
  );
}
