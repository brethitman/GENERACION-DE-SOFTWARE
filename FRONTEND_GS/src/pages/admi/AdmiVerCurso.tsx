import { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Tipado de datos
interface Topico {
  id: number;
  titulo: string;
}

interface Docente {
  id: number;
  nombre: string;
  rol: string;
}

interface Curso {
  id: number;
  titulo: string;
  descripcion: string;
  topicos: Topico[];
}

export default function CursoPanel() {
  const navigate = useNavigate();
  const [editEnabled, setEditEnabled] = useState(false);
  const [curso, setCurso] = useState<Curso | null>(null);
  const [docentes, setDocentes] = useState<Docente[]>([]);

  useEffect(() => {
    // Obtener curso con tópicos
    const fetchCurso = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/v1/cursos/1/topicos");
        const data = await res.json();
        if (data.ok) setCurso(data.curso);
      } catch (err) {
        console.error(err);
      }
    };

    // Obtener usuarios con rol "editor"
    const fetchUsuarios = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/v1/usuarios");
        const data = await res.json();
        if (data.ok) {
          const editores: Docente[] = data.usuarios.filter((u: Docente) => u.rol === "editor");
          setDocentes(editores);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchCurso();
    fetchUsuarios();
  }, []);

  const handleClick = () => {
    navigate("/panel/admin");
  };

  if (!curso) return <p>Cargando curso...</p>;

  return (
    <section className="min-h-screen bg-gray-100 px-12 py-10 relative">
      <div className="flex justify-end mb-6">
        <button
          onClick={handleClick}
          className="flex items-center text-[#7E3132] font-medium hover:underline"
        >
          Ir a Panel Administrativo
          <FaArrowRight className="ml-1" />
        </button>
      </div>

      <div className="flex justify-between items-start mb-10">
        <div>
          <h2 className="text-sm font-semibold text-gray-800">CURSO</h2>
          <h1 className="text-2xl font-bold text-[#7E3132] uppercase">{curso.titulo}</h1>
          <p className="text-sm text-gray-600 mt-1">{curso.descripcion}</p>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-gray-800 mb-2">DOCENTES EDITORES</h2>
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

      <div className="flex justify-between items-start mt-8 gap-6">
        <div className="bg-white rounded-2xl shadow-md border border-gray-300 p-6 w-2/3 min-h-[320px]">
          <h3 className="font-semibold text-gray-800 mb-3">TÓPICOS</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            {curso.topicos.map((t: Topico) => (
              <li key={t.id} className="border-b border-gray-200 pb-1 last:border-none">
                {t.titulo}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-2xl shadow-md border border-gray-300 p-6 w-1/3 min-h-[320px]">
          <h3 className="font-semibold text-gray-800 mb-3">DOCENTES EDITORES</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            {docentes.map((d: Docente) => (
              <li key={d.id} className="border-b border-gray-200 pb-1 last:border-none">
                {d.nombre}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
