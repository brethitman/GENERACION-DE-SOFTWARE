// src/pages/VerTopico.tsx
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

import { fetchTopicoPorId } from "../../services/topicos";
import type { ContenidoTopico, Bloque } from "../../types/Topico";

interface TopicoConId {
  titulo: string;
  contenido?: ContenidoTopico;
}

export default function VerTopico() {
  const { id } = useParams<{ id?: string }>();

  // --- Hooks ---
  const [topico, setTopico] = useState<TopicoConId | null>(null);
  const [error, setError] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

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

  // --- Escalado para que quepa en pantalla ---
  useEffect(() => {
    const resize = () => {
      if (!contentRef.current) return;
      const contentHeight = contentRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      const newScale = contentHeight > 0 ? Math.min(1, windowHeight / contentHeight) : 1;
      setScale(newScale);
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [topico]);

  // --- Renderizado de estados ---
  if (error) return <div className="text-red-500 p-6">Error: {error}</div>;
  if (!topico) return <div className="text-gray-500 p-6">Cargando tópico...</div>;

  return (
    <div className="h-[calc(100vh-125px)] overflow-hidden flex items-center justify-center bg-gray-50 p-8">
      <div
        ref={contentRef}
        className="max-w-4xl w-full origin-top-left"
        style={{ transform: `scale(${scale})` }}
      >
        <h1 className="text-3xl font-bold text-[#7E3132] mb-6">{topico.titulo}</h1>

        <div className="prose prose-neutral max-w-none">
          {topico.contenido?.bloques?.map((bloque: Bloque, index: number) => {
            if (bloque.tipo === "imagen" && bloque.url) {
              return (
                <img
                  key={index}
                  src={bloque.url}
                  alt=""
                  className="my-4 rounded"
                />
              );
            }

            return (
              <div
                key={index}
                className="my-2"
                dangerouslySetInnerHTML={{ __html: bloque.html ?? "" }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
