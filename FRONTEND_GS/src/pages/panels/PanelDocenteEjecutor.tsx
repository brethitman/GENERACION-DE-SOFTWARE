
import { CiMail } from "react-icons/ci";

import  userdefect from "../../assets/userdefect.png";
import { useAuth } from "../../hooks/useAuth";

export default function PanelDocenteEjecutor() {
const { usuario} = useAuth();
if (!usuario) return null;
const { rol, nombre, correo } = usuario;

return (
<section className="min-h-screen bg-gray-100 flex flex-col">
  <main className="flex flex-wrap gap-8 justify-center items-start px-10 py-8">
    {/* Panel del perfil docente ejecutor */}

    <div className="bg-white rounded-2xl shadow-md border border-gray-300 w-72 p-6 flex flex-col items-center">
      
      <h2 className="text-sm font-semibold mb-4 uppercase">DOCENTE {rol}</h2>
      <div className="w-40 h-40 border border-gray-400 flex items-center justify-center mb-3">
        <span className="text-gray-400 text-sm"><img
        src={userdefect}
      /></span>
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

    
  </main>
</section>
);
}