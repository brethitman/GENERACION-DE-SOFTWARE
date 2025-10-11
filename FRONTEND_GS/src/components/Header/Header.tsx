import { Link } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";

export default function Header() {
  const { estaAutenticado, usuario, cerrarSesion } = useAuth();

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-10 py-3">
        {/* LOGO + TÍTULO */}
        <div className="flex items-center gap-3">
          {/* Logo temporal */}
          <div className="w-10 h-10 bg-[#7a1414] rounded-full flex items-center justify-center text-white font-bold text-lg">
            P
          </div>

          <div className="flex flex-col leading-tight">
            <span className="text-[#7a1414] text-lg font-bold">
              El Club Del Frijol
            </span>
            <span className="text-sm text-gray-700">
              Aprender a programar en Python
            </span>
          </div>
        </div>

        {/* BOTONES DE SESIÓN */}
        <div className="flex items-center gap-5 pr-6">
          {estaAutenticado ? (
            <>
              <span className="text-sm text-gray-700">
                {usuario?.nombre}{" "}
                <span className="uppercase text-gray-500">
                  ({usuario?.rol})
                </span>
              </span>
              <button
                onClick={cerrarSesion}
                className="px-4 py-1.5 text-sm font-semibold rounded-md bg-[#3b3831] text-white hover:bg-[#2f2c27] transition-colors"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-[#7a1414] font-semibold hover:underline text-sm"
              >
                Iniciar Sesión
              </Link>

              <Link
                to="/registro"
                className="px-4 py-1.5 text-sm font-semibold rounded-md bg-[#3b3831] text-white hover:bg-[#2f2c27] transition-colors shadow-sm"
              >
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
