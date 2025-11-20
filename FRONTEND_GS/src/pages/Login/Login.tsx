// src/pages/Login/Login.tsx
import { useState } from "react";
import { CiMail, CiLock } from "react-icons/ci";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { useAuth } from "../../../src/context/auth-context";
import { rutaPorRol } from "../../../src/utils/rutaPorRol";

export default function Login(): JSX.Element {
  const [correo, setCorreo] = useState<string>("");
  const [contrasena, setContrasena] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const { iniciarSesion, iniciarSesionConGoogle } = useAuth();

  const enviar = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError(null);
    setCargando(true);
    try {
      const usuario = await iniciarSesion({ correo, contrasena });
      navigate(rutaPorRol(usuario.rol), { replace: true });
    } catch (err: unknown) {
      const msg: string = err instanceof Error ? err.message : "No se pudo iniciar sesión";
      setError(msg);
    } finally {
      setCargando(false);
    }
  };

  return (
    <section className="max-w-md mx-auto bg-white rounded-2xl border border-neutral-400 p-12 shadow-xl">
      <h1 className="text-l text-stone-800 font-bold mb-0 text-center">Bienvenido al Club</h1>
      <h1 className="text-xl text-[#7E3132] font-bold mb-3 text-center">INICIAR SESIÓN</h1>
      <form className="space-y-3" onSubmit={enviar}>
        <div>
          <label htmlFor="email" className="flex items-center space-x-2 mb-1">
            <CiMail className="w-6 h-6 text-[#7E3132]" />
            <span className="font-bold text-stone-700 text-sm">Correo Electrónico</span>
          </label>
          <input
            id="email"
            type="email"
            required
            placeholder="Ingrese su correo electrónico..."
            className="w-full border border-stone-600 rounded-lg px-3 py-2 outline-none focus:ring-0 focus:border-[#C25051]"
            value={correo}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCorreo(e.target.value)}
          />
        </div>
        <div className="flex flex-col mb-4 relative">
          <label htmlFor="password" className="flex items-center space-x-2 mb-1">
            <CiLock className="w-6 h-6 text-[#7E3132]" />
            <span className="font-bold text-stone-700 text-sm">Contraseña</span>
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              placeholder="Ingrese su contraseña..."
              className="w-full border border-stone-600 rounded-lg px-3 py-2 pr-14 outline-none focus:ring-0 focus:border-[#C25051]"
              value={contrasena}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContrasena(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
            </button>
          </div>
        </div>
        {error && (
          <p className="text-sm text-red-600 bg-red-50 rounded-md p-2">{error}</p>
        )}
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-5/6 rounded-lg px-4 py-2 bg-[#7E3132] text-white hover:bg-[#712C2D] disabled:opacity-60 transition-all"
            disabled={cargando}
          >
            {cargando ? "Ingresando..." : "Ingresar"}
          </button>
        </div>
      </form>
      <div className="flex items-center w-full my-4">
        <div className="flex-grow border-t border-stone-400"></div>
        <span className="mx-2 text-stone-500">o</span>
        <div className="flex-grow border-t border-stone-400"></div>
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <button
          type="button"
          onClick={iniciarSesionConGoogle}
          className="flex items-center justify-center w-5/6 rounded-lg px-4 py-2 bg-white text-stone-600 border border-stone-400 hover:bg-stone-200 disabled:opacity-60 transition-all"
        >
          <FcGoogle className="w-6 h-6 ml-1" />
          <span className="ml-2">Continuar con Google</span>
        </button>
      </div>
      <p className="text-sm text-gray-600 text-center mt-4">
        ¿No tienes una cuenta?{" "}
        <Link to="/registro" className="font-semibold text-[#7E3132] hover:text-[#712C2D] hover:underline">
          Regístrate
        </Link>
      </p>
    </section>
  );
}
