import { useState } from "react";
import {CiMail, CiLock} from 'react-icons/ci';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import { rutaPorRol } from "../../utils/rutaPorRol"; // 👈 la volvemos a usar



export default function Login() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { iniciarSesion } = useAuth();

  const enviar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setCargando(true);
    try {
      const usuario = await iniciarSesion({ correo, contrasena });
      navigate(rutaPorRol(usuario.rol), { replace: true }); // ✅ ahora sí lo usamos
    } catch (err) {
      const msg = err instanceof Error ? err.message : "No se pudo iniciar sesión";
      setError(msg);
    } finally {
      setCargando(false);
    }
  };

  return (
    <section className="max-w-sm mx-auto bg-white rounded-2xl border border-neutral-400 p-8 shadow-xl">
      <h1 className="text-l text-stone-800 font-bold mb-0 text-center">Bienvenido al Club</h1>
      <h1 className="text-xl text-[#7E3132] font-bold mb-3 text-center">INICIAR SESIÓN</h1>
      <form className="space-y-4" onSubmit={enviar}>
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
<p className="text-sm text-gray-600 text-center mt-4">
  ¿No tienes una cuenta?{" "}
  <a href="#" className="font-semibold text-[#7E3132] hover:text-[#712C2D] hover:underline">
    Regístrate
  </a>
</p>
      </form>
    </section>
  );
}
