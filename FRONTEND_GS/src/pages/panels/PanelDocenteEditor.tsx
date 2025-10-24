
import { useState } from "react";
import { CiMail } from "react-icons/ci";
import { MdOutlineTopic } from "react-icons/md";
import { TbClipboardHeart, TbClipboardCheck } from "react-icons/tb";

import  userdefect from "../../assets/userdefect.png";
import Modal from "../../components/Modal/Modal";
import { useAuth } from "../../hooks/useAuth";

export default function PanelDocenteEditor() {
const { usuario} = useAuth();
const [isModalOpen, setIsModalOpen] = useState(false);
if (!usuario) return null;
const { rol, nombre, correo } = usuario;

return (
<section className="min-h-screen bg-gray-100 flex flex-col">
  <main className="flex flex-wrap gap-8 justify-center items-start px-10 py-8">
    {/* Panel del perfil docente editor */}

    <div className="bg-white rounded-2xl shadow-md border border-gray-300 w-72 p-6 flex flex-col items-center">
      
      <h2 className="text-sm font-semibold mb-4 uppercase">
      DOCENTE {rol}
      </h2>
      <div className="w-40 h-40 border border-gray-400 flex items-center justify-center mb-3">
        <span className="text-gray-400 text-sm"><img
        src={userdefect}
      /></span>
      </div>
      <p className="font-semibold text-[#7E3132]">{nombre} </p>
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

      {/* Gestionar */}
    <div className="flex flex-col gap-6 w-[600px]">
      <div className="space y-4">
        <h2 className="text-lg font-bold text-gray-700">AGREGAR...</h2>
       <div className="flex justify-center gap-10 mt-6"> 
          <button className="flex items-center justify-center bg-[#7E3132] text-white rounded-md px-6 py-3 hover:bg-[#6c2b2c] transition"
          onClick={() => setIsModalOpen(true)}> 
            <MdOutlineTopic className="w-6 h-6 ml-1" />
            <span className="ml-2">Topico</span>
          </button> 
           <button className="flex items-center justify-center bg-[#7E3132] text-white rounded-md px-6 py-3 hover:bg-[#6c2b2c] transition"
           onClick={() => setIsModalOpen(true)}> 
            <TbClipboardCheck className="w-6 h-6 ml-1" />
            <span className="ml-2">Evaluación</span>
          </button> 
          <button className="flex items-center justify-center bg-[#7E3132] text-white rounded-md px-6 py-3 hover:bg-[#6c2b2c] transition"
          onClick={() => setIsModalOpen(true)}> 
            <TbClipboardHeart className="w-6 h-6 ml-1" />
            <span className="ml-2">Diagnostico</span>
          </button> 
        </div>

        
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="¡Ups! El curso aun no esta abierto a edición"
      >
        <p>
          El período de edición del curso todavía no ha comenzado.
          Podrás añadir tópicos, evaluaciones y diagnósticos cuando el administrador lo habilite
          </p>
      </Modal>
      </div>

      <div className="bg-gray rounded-2xl space-y-4">
              <h2 className="text-lg font-bold text-gray-700">TOPICOS...</h2>
      
              {/* Roles */}
              <div className="bg-white rounded-2xl border border-gray-300 p-5 space-y-2">
                <h1 className="font-bold text-stone-300">
                  Aun nada...
                </h1>
        </div>
        </div>
      </div>
  </main>
</section>
);
}