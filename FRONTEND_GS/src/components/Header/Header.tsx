import { Link } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";

export default function Header() {
  const { estaAutenticado, usuario, cerrarSesion } = useAuth();

  return (
    <header className="w-full border-b bg-white/70 backdrop-blur sticky top-0 z-10">
      <div className="container flex items-center justify-between py-3">
        <nav className="flex gap-4">
          <Link className="text-sm hover:underline" to="/">Inicio</Link>
          <Link className="text-sm hover:underline" to="/usuarios">Usuarios</Link>
        </nav>

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
