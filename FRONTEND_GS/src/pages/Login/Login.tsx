// src/pages/Login/Login.tsx
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { BotonGoogle } from "../../components/BotonGoogle/BotonGoogle";
import { useAuth } from "../../hooks/useAuth";
import { IconoContrasena } from "../../icons/IconoContrasena";
import { IconoCorreo } from "../../icons/IconoCorreo";
import { rutaPorRol } from "../../utils/rutaPorRol";

export default function Login() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const rol = searchParams.get("rol"); // ⬅️ estudiante, admin, etc.

  const { iniciarSesion } = useAuth();

  const enviar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setCargando(true);
    try {
      const usuario = await iniciarSesion({ correo, contrasena });
      navigate(rutaPorRol(usuario.rol), { replace: true });
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "No se pudo iniciar sesión";
      setError(msg);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <section className="w-[380px] bg-white rounded-2xl shadow-lg p-8 text-center border">
        <h1 className="text-xl font-semibold text-gray-800">
          Bienvenido al curso
        </h1>
        <h2 className="text-lg text-[#7a1414] font-semibold mb-6">
          INICIAR SESIÓN {rol ? `(${rol.toUpperCase()})` : ""}
        </h2>

        <form onSubmit={enviar} className="space-y-4 text-left">
          {/* Campo correo */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              <span className="flex items-center gap-2">
                <IconoCorreo /> Correo Electrónico
              </span>
            </label>
            <input
              type="email"
              required
              placeholder="Ingrese su correo..."
              className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-[#7a1414]/40 focus:border-[#7a1414] outline-none text-sm"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>

          {/* Campo contraseña */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              <span className="flex items-center gap-2">
                <IconoContrasena /> Contraseña
              </span>
            </label>
            <input
              type="password"
              required
              placeholder="Ingrese su contraseña..."
              className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-[#7a1414]/40 focus:border-[#7a1414] outline-none text-sm"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 rounded-md p-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={cargando}
            className="w-full py-2 rounded-md bg-[#7a1414] text-white hover:bg-[#5e0f0f] transition-all"
          >
            {cargando ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        {/* SEPARADOR VISUAL */}
        <div className="flex items-center my-5">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-400 text-sm">o</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* BOTÓN DE GOOGLE */}
        <BotonGoogle />

        {/* ENLACE DE REGISTRO */}
        <p className="text-sm mt-5 text-gray-700">
          ¿No tienes una cuenta?{" "}
          <a
            href="/registro"
            className="text-[#7a1414] font-semibold hover:underline"
          >
            Regístrate
          </a>
        </p>
      </section>
    </div>
  );
}
