import { useState } from "react";
import {CiMail, CiLock, CiUser} from 'react-icons/ci';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {FcGoogle} from 'react-icons/fc';
import { Link, useNavigate } from "react-router-dom";


import { registrarUsuario } from "../../services/usuarios";
import type { Rol } from "../../types/Usuario";

export default function Registro() {

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [confirmar, setConfirmar] = useState("");

  const [rol] = useState<Rol>("estudiante");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // estados para mostrar/ocultar
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);


  const navigate = useNavigate();

  const enviar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (contrasena !== confirmar) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      setCargando(true);

      const res = await registrarUsuario({ nombre, correo, contrasena, rol });

      // ✅ Redirigir a verificación
      navigate("/verificacion", {
        state: {
          usuarioId: res.usuarioId,
          correo: correo,
          mensaje:
            "Te hemos enviado un código de verificación a tu correo electrónico.",
        },
      });
    } catch (err: unknown) {
      let mensaje = "No se pudo registrar";
      if (err instanceof Error) {
        mensaje = err.message;
      }
      setError(mensaje);
    } finally {
      setCargando(false);
    }
  };

  return (
    <section className="max-w-md mx-auto bg-white rounded-2xl border border-neutral-400 p-12 shadow-xl">
      <h1 className="text-l text-stone-800 font-bold mb-0 text-center">Unete al Club</h1>
      <h1 className="text-xl text-[#7E3132] font-bold mb-3 text-center">REGÍSTRATE</h1>

      <form className="space-y-3" onSubmit={enviar}>
        <div>
          <label htmlFor="name" className="flex items-center space-x-2 mb-1">
              <CiUser className="w-6 h-6 text-[#7E3132]"/>
            <span className="font-bold text-stone-700 text-sm">Nombre Completo</span>
          </label>
         <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ingrese su nombre y apellidos..."
            className="w-full border border-stone-600 rounded-lg px-3 py-2 outline-none focus:ring-0 focus:border-[#C25051]"
            required

          />
        </div>

        <div>
          <label htmlFor="email" className="flex items-center space-x-2 mb-1">
              <CiMail className="w-6 h-6 text-[#7E3132]"/>
            <span className="font-bold text-stone-700 text-sm">Correo Electrónico</span>
          </label>
         <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
            placeholder="Ingrese su correo electrónico..."
            className="w-full border border-stone-600 rounded-lg px-3 py-2 outline-none focus:ring-0 focus:border-[#C25051]"
          />
        </div>

        <div className="flex flex-col mb-4 relative">
          <label htmlFor="password" className="flex items-center space-x-2 mb-1">
              <CiLock className="w-6 h-6 text-[#7E3132]"/>
            <span className="font-bold text-stone-700 text-sm">Contraseña</span>
          </label>
          <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            required
            placeholder="Ingrese su contraseña..."
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            className="w-full border border-stone-600 rounded-lg px-3 py-2 pr-14 outline-none focus:ring-0 focus:border-[#C25051]"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
           {showPassword ? <FaEyeSlash className="w-5 h-5"/> : <FaEye className="w-5 h-5"/>}
          </button>
          </div>
        </div>

       <div className="flex flex-col mb-4 relative">
          <label htmlFor="password" className="flex items-center space-x-2 mb-1">
              <CiLock className="w-6 h-6 text-[#7E3132]"/>
            <span className="font-bold text-stone-700 text-sm">Confirmar Contraseña</span>
          </label>
          <div className="relative">
          <input
            type={showConfirm ? "text" : "password"}
            onChange={(e) => setConfirmar(e.target.value)}
            value={confirmar}
            required
            placeholder="Vuelva a ingresar su contraseña..."
            className="w-full border border-stone-600 rounded-lg px-3 py-2 pr-14 outline-none focus:ring-0 focus:border-[#C25051]"
          />
          <button
            type="button"
            aria-label={showConfirm ? "Ocultar contraseña de confirmación" : "Mostrar contraseña de confirmación"}
            onClick={() => setShowConfirm((s) => !s)}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
           {showConfirm ? <FaEyeSlash className="w-5 h-5"/> : <FaEye className="w-5 h-5"/>}
          </button>
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 rounded p-2">{error}</p>
        )}

        <div className="flex justify-center">
        <button
          type="submit"
          disabled={cargando}
          className="w-5/6 rounded-lg px-4 py-2 bg-[#7E3132] text-white hover:bg-[#712C2D] disabled:opacity-60 transition-all">
          {cargando ? "Registrando..." : "Registrarme"}
        </button>
        </div>
      </form>

        <div className="flex items-center w-full my-4">
           <div className="flex-grow border-t border-stone-400"></div>
               <span className="mx-2 text-stone-500">o</span>
           <div className="flex-grow border-t border-stone-400"></div>
        </div>

        <div className="flex flex-col items-center justify-center gap-2">
            <button className="flex items-center justify-center w-5/6 rounded-lg px-4 py-2 bg-white text-stone-600 border border-stone-400 hover:bg-stone-200 disabled:opacity-60 transition-all">
            <FcGoogle className="w-6 h-6 ml-1"/>
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
     ¿Ya tienes una cuenta?{" "}
       <Link to="/login" className="font-semibold text-[#7E3132] hover:text-[#712C2D] hover:underline">
      Iniciar Sesión
       </Link>
    </p>
    </section>
  );
}
