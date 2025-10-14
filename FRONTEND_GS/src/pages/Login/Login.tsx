// src/pages/Login/Login.tsx
import { useState } from "react";
<<<<<<< HEAD
import { useNavigate, useSearchParams } from "react-router-dom";
=======
import {CiMail, CiLock} from 'react-icons/ci';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {FcGoogle} from 'react-icons/fc';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
>>>>>>> origin/josue_clean

import { BotonGoogle } from "../../components/BotonGoogle/BotonGoogle";
import { useAuth } from "../../hooks/useAuth";
<<<<<<< HEAD
import { IconoContrasena } from "../../icons/IconoContrasena";
import { IconoCorreo } from "../../icons/IconoCorreo";
import { rutaPorRol } from "../../utils/rutaPorRol";
=======
import { rutaPorRol } from "../../utils/rutaPorRol"; // 👈 la volvemos a usar

>>>>>>> origin/josue_clean

export default function Login() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);
<<<<<<< HEAD

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const rol = searchParams.get("rol"); // ⬅️ estudiante, admin, etc.

=======
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
>>>>>>> origin/josue_clean
  const { iniciarSesion } = useAuth();

  const enviar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setCargando(true);
    try {
      const usuario = await iniciarSesion({ correo, contrasena });
<<<<<<< HEAD
      navigate(rutaPorRol(usuario.rol), { replace: true });
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "No se pudo iniciar sesión";
=======
      navigate(rutaPorRol(usuario.rol), { replace: true }); // ✅ ahora sí lo usamos
    } catch (err) {
      const msg = err instanceof Error ? err.message : "No se pudo iniciar sesión";
>>>>>>> origin/josue_clean
      setError(msg);
    } finally {
      setCargando(false);
    }
  };

  return (
<<<<<<< HEAD
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
            <label htmlFor="correo" className="block text-sm font-semibold text-gray-700 mb-1">
              <span className="flex items-center gap-2">
                <IconoCorreo /> Correo Electrónico
              </span>
            </label>
            <input
              id="correo"
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
            <label htmlFor="contrasena" className="block text-sm font-semibold text-gray-700 mb-1">
              <span className="flex items-center gap-2">
                <IconoContrasena /> Contraseña
              </span>
            </label>
            <input
              id="contrasena"
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
=======
    <section className="max-w-md mx-auto bg-white rounded-2xl border border-neutral-400 p-12 shadow-xl">
      <h1 className="text-l text-stone-800 font-bold mb-0 text-center">Bienvenido al Club</h1>
      <h1 className="text-xl text-[#7E3132] font-bold mb-3 text-center">INICIAR SESIÓN</h1>
      <form className="space-y-3" onSubmit={enviar}>
        <div>
          <label htmlFor="email" className="flex items-center space-x-2 mb-1">
              <CiMail className="w-6 h-6 text-[#7E3132]"/>
            <span className="font-bold text-stone-700 text-sm">Correo Electrónico</span>
          </label>
         <input
            id="email"
            type="email"
            required
            placeholder="Ingrese su correo electrónico..."
            className="w-full border border-stone-600 rounded-lg px-3 py-2 outline-none focus:ring-0 focus:border-[#C25051]"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
        </div>

        <div className="flex flex-col mb-4 relative">
          <label htmlFor="password" className="flex items-center space-x-2 mb-1">
              <CiLock className="w-6 h-6 text-[#7E3132]"/>
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
            onChange={(e) => setContrasena(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
           {showPassword ? <FaEyeSlash className="w-5 h-5"/> : <FaEye className="w-5 h-5"/>}
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
             onClick={() => window.location.href = "http://localhost:3000/api/v1/autenticacion/google"}
             className="flex items-center justify-center w-5/6 rounded-lg px-4 py-2 bg-white text-stone-600 border border-stone-400 hover:bg-stone-200 disabled:opacity-60 transition-all"
            >
             <FcGoogle className="w-6 h-6 ml-1" />
             <span className="ml-2">Continuar con Google</span>
           </button>
           <button className="flex items-center justify-center w-5/6 rounded-lg px-4 py-2 bg-white text-stone-600 border border-stone-400 hover:bg-stone-200 disabled:opacity-60 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 ml-1" fill="none" viewBox="0 0 48 48" strokeWidth="2">
                <path fill="#ff5722" d="M6 6H22V22H6z" transform="rotate(-180 14 14)"></path>
                <path fill="#4caf50" d="M26 6H42V22H26z" transform="rotate(-180 34 14)"></path>
                <path fill="#ffc107" d="M26 26H42V42H26z" transform="rotate(-180 34 34)"></path>
                <path fill="#03a9f4" d="M6 26H22V42H6z" transform="rotate(-180 14 34)"></path>
            </svg>
            <span className="ml-2">Continuar con Microsoft</span>
           </button>
        </div>
    <p className="text-sm text-gray-600 text-center mt-4">
     ¿No tienes una cuenta?{" "}
       <Link to="/registro" className="font-semibold text-[#7E3132] hover:text-[#712C2D] hover:underline">
      Regístrate
       </Link>
    </p>

    </section>
>>>>>>> origin/josue_clean
  );
}