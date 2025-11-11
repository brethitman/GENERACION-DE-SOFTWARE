import { CiMail } from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function PanelAdmin() {
const navigate = useNavigate();

  const handleClick = () => {
    navigate("/roles");
  };
    const handleClickCurso = () => {
    navigate("/CursoAdmi");
  };

return (
<section className="min-h-screen bg-gray-100 flex flex-col">
  <main className="flex flex-wrap gap-8 justify-center items-start px-10 py-8">
    {/* Panel del administrador */}
    <div className="bg-white rounded-2xl shadow-md border border-gray-300 w-72 p-6 flex flex-col items-center">
      <h2 className="text-sm font-semibold mb-4">ADMINISTRADOR</h2>
      <div className="w-40 h-40 border border-gray-400 flex items-center justify-center mb-3">
        <span className="text-gray-400 text-sm">Foto Perfil</span>
      </div>
      <p className="font-semibold text-[#7E3132]">Nombre Admin</p>
      <div className="mt-3 text-center">
        <div className="flex items-center justify-center space-x-2 text-sm">
          <CiMail className="w-5 h-5 text-gray-600" />
          <span className="font-semibold text-gray-800">
            Correo Electrónico
          </span>
        </div>
        <p className="text-gray-700 text-sm">admin@gmail.com</p>
      </div>
      <button className="mt-4 border border-[#7E3132] text-[#7E3132] rounded-md px-4 py-1 text-sm hover:bg-[#7E3132] hover:text-white transition-all">
        Editar Perfil
      </button>
    </div>


    <div className="flex flex-col gap-6 w-[600px]">
      {/* Curso actual */}
      <div className="bg-gray rounded-2xl p-6s pace-y-4">
        <h2 className="text-lg font-bold text-gray-700 mb-2">CURSO</h2>
        <div className="bg-white rounded-2xl border border-gray-300 p-5 flex flex-col space-y-3">
          <div>
            <h3 className="font-bold text-[#7E3132] uppercase">
              Curso Actual : Introducción a la Programación
            </h3>
            <p className="text-sm text-gray-600">Descripción del curso...</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={handleClickCurso}
              className="ml-auto flex items-center text-[#7E3132] font-medium hover:underline"
              >
                Ver Curso <FaArrowRight className="ml-1" />
            </button>
          </div>
        </div>
        <div className="flex justify-center gap-15 mt-6"> 
          <button className="bg-[#7E3132] text-white rounded-md px-6 py-2 hover:bg-[#6c2b2c] transition"> 
            Capturar Curso 
          </button> 
          <button className="bg-[#2b2b2b] text-white rounded-md px-6 py-2 hover:bg-[#1f1f1f] transition"> 
            Ver Historial Cursos  
          </button> 
        </div>
      </div>

      {/* Gestionar */}
      <div className="bg-gray rounded-2xl space-y-4">
        <h2 className="text-lg font-bold text-gray-700">GESTIONAR</h2>

        {/* Roles */}
        <div className="bg-white rounded-2xl border border-gray-300 p-5 space-y-2">
          <h3 className="font-bold text-[#7E3132] uppercase">
            Roles de Usuario
          </h3>
          <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
            <li>Ver datos de todos los usuarios</li>
            <li>Asignar roles (Editor / Ejecutor)</li>
          </ul>
          <button
            onClick={handleClick}
            className="ml-auto flex items-center text-[#7E3132] font-medium hover:underline"
            >
              Ir a Roles de Usuario
            <FaArrowRight className="ml-1" />
          </button>
        </div>

        {/* Grupos */}
        <div className="bg-[#f9f9f9] rounded-2xl border border-gray-300 p-5 space-y-2">
          <h3 className="font-bold text-[#7E3132] uppercase">Grupos</h3>
          <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
            <li>Asignar grupos a docentes</li>
            <li>Ver datos de docentes y estudiantes</li>
            <li>Crear grupos</li>
          </ul>
          <button className="ml-auto flex items-center text-[#7E3132] font-medium hover:underline">
            Ir a Grupos <FaArrowRight className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  </main>
</section>
);
}