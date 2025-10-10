import { Link } from "react-router-dom";

import  logo  from '../../assets/logo.png';
import { useAuth } from "../../hooks/useAuth";


export default function Header() {
  const { estaAutenticado, usuario, cerrarSesion } = useAuth();

  return (
    <header className="w-full bg-white/70 backdrop-blur sticky top-0 z-10 border border-neutral-400 p-1 shadow-md">
      <div className="container flex items-center justify-between px-6 py-2">
        
        <div className="flex items-center space-x-0">
        <img src={logo} alt="Logo" className="w-10 h-13 right-8" />
        <div className="flex flex-col">
            <span className="text-xl font-bold text-[#7E3132]">El Club Del Frijol</span>
            <span className="text-xs text-stone-800">Programando python</span>
          </div>
        </div>
 
      <div className="flex items-center space-x-3">
        <nav className="flex gap-4">
          <Link className="text-sm hover:underline" to="/">Inicio</Link>
          <Link className="text-sm hover:underline" to="/usuarios">Usuarios</Link>
        </nav>
      </div>
        <div className="flex items-center gap-3">
          {estaAutenticado ? (
            <>
              <span className="text-xs text-gray-600">
                {usuario?.nombre} <span className="uppercase">({usuario?.rol})</span>
              </span>
              <button
                onClick={cerrarSesion}
                className="px-3 py-1.5 text-sm border rounded-lg hover:bg-gray-50"
              >
                Salir
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="px-3 py-1.5 text-sm border rounded-lg hover:bg-gray-50"
            >
              Ingresar
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
