import { useEffect, useState } from "react";
import { CiMail } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { MdOutlineTopic } from "react-icons/md";
import { TbClipboardHeart, TbClipboardCheck } from "react-icons/tb";
import { Link } from "react-router-dom";

import userdefect from "../../assets/userdefect.png";
import Modal from "../../components/Modal/Modal";
import EditarCursoModal from "../../components/ModalCurso/ModalCurso";
import CrearTopicoModal from "../../components/ModalTopico/ModalTopico";
import { useAuth } from "../../context/auth-context";
import { fetchTopicos } from "../../services/topicos";
import type { Curso } from "../../types/Curso";
import type { Topico } from "../../types/Topico";

export default function PanelDocenteEditor() {
  const idCurso = "1"; // Único curso creado por ahora
  const { usuario } = useAuth();

  const [curso, setCurso] = useState<Curso | null>(null);
  const [cursoError, setCursoError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false); // advertencia
  const [modalOpen, setModalOpen] = useState(false); // crear tópico
  const [modalCurso, setModalCurso] = useState(false); // editar curso

  const [topicos, setTopicos] = useState<Topico[]>([]);
  const [error, setError] = useState<string | null>(null);

  // 🔹 Fetch del curso actual
  const fetchCursoActual = async () => {
    try {
      const res = await fetch(`https://generacionback.vercel.app/api/v1/cursos/${idCurso}`);
      const data = await res.json();

      if (!data.ok) {
        setCursoError("No se pudo cargar el curso");
        return null;
      }

      return data.curso;
    } catch {
      setCursoError("Error al conectar con el servidor");
      return null;
    }
  };

  useEffect(() => {
    // 🔹 Cargar tópicos
    fetchTopicos()
      .then((data) => {
        const filtrados = data.filter((t) => t.idCurso === idCurso);
        const ordenados = filtrados.sort((a, b) => a.orden - b.orden);
        setTopicos(ordenados);
      })
      .catch((error) => setError(error.message));

    // 🔹 Cargar curso
    fetchCursoActual().then((cursoData) => {
      if (cursoData) setCurso(cursoData);
    });
  }, [idCurso]);

  if (!usuario) return null;

  const { rol, nombre, correo } = usuario;

  return (
    <section className="min-h-full bg-gray-100 flex flex-col">
      <main className="flex flex-wrap gap-8 justify-center items-start px-10 py-8">
        {/* Panel del perfil */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-300 w-72 p-6 flex flex-col items-center">
          <h2 className="text-sm font-semibold mb-4 uppercase">DOCENTE {rol}</h2>

          <div className="w-40 h-40 border border-gray-400 flex items-center justify-center mb-3">
            <img src={userdefect} alt="usuario" />
          </div>

          <p className="font-semibold text-[#7E3132]">{nombre}</p>

          <div className="mt-3 text-center">
            <div className="flex items-center justify-center space-x-2 text-sm">
              <CiMail className="w-5 h-5 text-gray-600" />
              <span className="font-semibold text-gray-800">
                Correo Electrónico
              </span>
            </div>
            <p className="text-gray-700 text-sm">{correo}</p>
          </div>

          <button className="mt-4 border border-[#7E3132] text-[#7E3132] rounded-md px-4 py-1 text-sm hover:bg-[#7E3132] hover:text-white transition-all">
            Editar Perfil
          </button>
        </div>

        {/* Gestión de tópicos */}
        <div className="flex flex-col gap-6 w-[500px]">
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-700">AGREGAR...</h2>

            <div className="flex justify-center gap-10 mt-6">
              <button
                className="flex items-center justify-center bg-[#7E3132] text-white rounded-md px-6 py-3 hover:bg-[#6c2b2c] transition"
                onClick={() => setModalOpen(true)}
              >
                <MdOutlineTopic className="w-6 h-6 ml-1" />
                <span className="ml-2">Tópico</span>
              </button>

              <button
                className="flex items-center justify-center bg-[#7E3132] text-white rounded-md px-6 py-3 hover:bg-[#6c2b2c] transition"
                onClick={() => setIsModalOpen(true)}
              >
                <TbClipboardCheck className="w-6 h-6 ml-1" />
                <span className="ml-2">Evaluación</span>
              </button>

              <button
                className="flex items-center justify-center bg-[#7E3132] text-white rounded-md px-6 py-3 hover:bg-[#6c2b2c] transition"
                onClick={() => setIsModalOpen(true)}
              >
                <TbClipboardHeart className="w-6 h-6 ml-1" />
                <span className="ml-2">Diagnóstico</span>
              </button>
            </div>

            {/* Modal advertencia */}
            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title="¡Ups! El curso aún no está abierto a edición"
            >
              <p>
                El período de edición del curso todavía no ha comenzado. Podrás
                añadir tópicos, evaluaciones y diagnósticos cuando el
                administrador lo habilite.
              </p>
            </Modal>

            {/* Crear tópico */}
            <CrearTopicoModal
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
              onCreated={(nuevoTopico) => setTopicos([...topicos, nuevoTopico])}
              idCurso={idCurso}
            />

            {/* Lista de tópicos */}
            <div className="bg-gray-50 rounded-2xl space-y-4">
              <h2 className="text-lg font-bold text-gray-700">TÓPICOS...</h2>
              <div className="bg-white rounded-2xl border border-gray-300 p-5 space-y-2">
                {error && (
                  <div className="text-red-500 font-semibold mt-2">
                    Error: {error}
                  </div>
                )}

                {topicos.length === 0 ? (
                  <h1 className="font-bold text-gray-400">Aún nada...</h1>
                ) : (
                  <ul className="mt-4 space-y-1">
                    {topicos.map((t) => (
                      <li key={t.id}>
                        <Link
                          to={`/editar-topico/${t.id}`}
                          className="block text-gray-700 hover:text-[#7E3132] font-medium hover:underline transition"
                        >
                          {t.orden}. {t.titulo}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Curso actual */}
        <div className="flex flex-col gap-6 w-[300px]">
          <div className="bg-gray rounded-2xl space-y-4">
            <h2 className="text-lg font-bold text-gray-700 mb-2">
              CURSO ACTUAL...
            </h2>

            <div className="bg-white rounded-2xl border border-gray-300 p-5 flex flex-col space-y-3">
              <div>
                <h3 className="font-bold text-[#7E3132] uppercase">
                  {curso ? curso.titulo : "Cargando..."}
                </h3>
                <p className="text-sm text-gray-600">
                  {curso
                    ? curso.descripcion || "Sin descripción"
                    : "Cargando..."}
                </p>
                {cursoError && (
                <div className="text-red-500 font-semibold mt-2">{cursoError}</div>
                )}

              </div>

              <div className="flex space-x-3">
                <button
                  className="ml-auto flex items-center text-[#7E3132] font-medium hover:underline"
                  onClick={() => setModalCurso(true)}
                >
                  <FaEdit className="mr-1" />
                  Editar Curso
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Editar curso */}
        {curso && (
              <EditarCursoModal
                id={idCurso}
                abierto={modalCurso}
                cerrar={() => setModalCurso(false)}
                curso={curso}
                actualizar={(cursoActualizado) => setCurso(cursoActualizado)}
              />
            )}
      </main>
    </section>
  );
}
