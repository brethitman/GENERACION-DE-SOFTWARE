import { useEffect, useRef, useState } from "react";
import { AiOutlineSave } from "react-icons/ai";
import { FaArrowRight } from "react-icons/fa";
import { ImEye } from "react-icons/im";
import { useNavigate, useParams } from "react-router-dom";

import EditorMenu, { type EditorMenuRef } from "../../components/Editor/EditorMenu";
import { fetchTopicoPorId, actualizarTopico } from "../../services/topicos";
import type { Topico } from "../../types/Topico";

export default function EditarTopico() {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const editorMenuRef = useRef<EditorMenuRef>(null);

  const [topico, setTopico] = useState<Topico | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGuardar = async () => {
    const json = editorMenuRef.current?.getTopicoJSON();
    if (!json) return alert("No hay contenido para guardar");

    try {
      const actualizado = await actualizarTopico(json.id, {
        titulo: json.titulo,
        contenido: json.contenido,
        orden: json.orden,
      });
      setTopico({ ...actualizado, contenido: actualizado.contenido ?? { bloques: [] } });
      alert("Tópico guardado");
    } catch (err) {
      console.error(err);
      alert("Error al guardar el tópico");
    }
  };

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);

    fetchTopicoPorId(id)
      .then((t) => setTopico({ ...t, contenido: t.contenido ?? { bloques: [] } }))
      .catch((e) => setError(e.message || "Error al cargar tópico"))
      .finally(() => setLoading(false));
  }, [id]);

  if (error) {
    return (
      <div className="p-6 max-w-5xl mx-auto text-center text-red-600">
        Error al cargar el tópico: {error}
      </div>
    );
  }
  if (loading) {
    return (
      <div className="p-6 max-w-5xl mx-auto text-center text-stone-500">
        Cargando topico...
      </div>
    );
  }
  const handleClick = () => navigate("/panel/docente-editor");

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white rounded-lg shadow">
      <div className="flex row items-center gap-2">
        <h1 className="text-xl font-bold text-[#7E3132] mb-4">{topico?.titulo ?? "Nombre del Tópico"}</h1>
        <div className="relative group inline-block">
          <button onClick={handleGuardar} className="px-1 py-1 bg-[#FEFEFE] rounded-md text-sm hover:bg-stone-100">
            <AiOutlineSave className="w-5 h-5 text-stone-800"/>
          </button>
          <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 
                bg-stone-200 text-stone-700 text-sm px-2 py-1 rounded 
                opacity-0 group-hover:opacity-100 
                pointer-events-none shadow-lg">
              Guardar
          </span>
        </div>
        <div className="relative group inline-block">
          <button 
            onClick={() => window.open(`/ver-topico/${topico?.id}`, "_blank")}
            className="px-1 py-1 bg-white rounded-md text-sm hover:bg-stone-100">
            <ImEye className="w-5 h-5 text-stone-800"/>
          </button>
          <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 
                bg-stone-200 text-stone-700 text-sm px-2 py-1 rounded 
                opacity-0 group-hover:opacity-100 
                pointer-events-none shadow-lg whitespace-nowrap">
             Ver Tópico
           </span>
        </div>
        <button onClick={handleClick} className="ml-auto flex items-center text-[#7E3132] font-medium hover:underline">
          Ir a Panel Docente Editor <FaArrowRight className="ml-1" />
        </button>
      </div>
      <EditorMenu ref={editorMenuRef} topico={topico ?? undefined} />
    </div>
  );
}
