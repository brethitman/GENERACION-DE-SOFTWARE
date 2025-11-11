
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import EditorMenu from '../../components/Editor/EditorMenu'
import type { Topico } from "../../services/topicos";
import { fetchTopicoPorId } from "../../services/topicos";

export default function EditarTopico() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/panel/docente-editor");
  };

  const { id } = useParams<{ id?: string }>();
  const [topico, setTopico] = useState<Topico | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);

    fetchTopicoPorId(id)
      .then((t) => setTopico(t))
      .catch((e) => setError(e.message || "Error al cargar tópico"))
      .finally(() => setLoading(false));
}, [id]);

  if (loading) return <div>Cargando tópico...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white rounded-lg shadow">
      <div className="flex row">
      
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-[#7E3132] mb-4">
          {topico?.titulo ?? "Nombre del Topico"}
        </h1>
        <button>  Guardar</button>
        <button>  Eliminar</button>
      </div>
      <button
        onClick={handleClick}
        className="ml-auto mb-4 flex items-center text-[#7E3132] font-medium hover:underline"
      >
        Ir a Panel Docente Editor
        <FaArrowRight className="ml-1" />
      </button>

      </div>
      <div>
      <EditorMenu topico={topico ?? undefined} />     </div>
    </div>
  );
}
