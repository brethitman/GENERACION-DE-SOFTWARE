// src/pages/Registro/Registro.tsx
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import { registrarUsuario } from "../../services/usuarios";
import type { Rol } from "../../types/Usuario";

export default function Registro() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [rol, setRol] = useState<Rol>("docente");
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

  // estados para mostrar/ocultar
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const navigate = useNavigate();

  const enviar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setOk(null);

    if (contrasena !== confirmar) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      setCargando(true);

      const res = await registrarUsuario({ nombre, correo, contrasena, rol });

      // guardar token si deseas mantener sesión tras el registro
      localStorage.setItem("token", res.datos.token);

      setOk("Registro exitoso. Redirigiendo al login…");
      setTimeout(() => navigate("/login", { replace: true }), 1200);
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
    <section className="max-w-md mx-auto bg-white rounded-2xl border border-neutral-400 p-8 shadow-xl">
      <h1 className="text-xl text-[#7E3132] font-bold mb-4 text-center">
        Crear cuenta
      </h1>

      <form className="space-y-4" onSubmit={enviar}>
        <input
          className="w-full border rounded-lg px-3 py-2"
          placeholder="Nombre completo"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <input
          className="w-full border rounded-lg px-3 py-2"
          placeholder="Correo"
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />

        <select
          className="w-full border rounded-lg px-3 py-2 bg-white"
          value={rol}
          onChange={(e) => setRol(e.target.value as Rol)}
        >
          <option value="estudiante">Estudiante</option>
          <option value="docente">Docente</option>
          <option value="administrador">Administrador</option>
        </select>

        {/* Contenedor relativo para el input con el botón ojo */}
        <div className="relative">
          <input
            className="w-full border rounded-lg px-3 py-2 pr-12"
            placeholder="Contraseña"
            type={showPassword ? "text" : "password"}
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />
          <button
            type="button"
            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            onClick={() => setShowPassword((s) => !s)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
          >
            {showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
          </button>
        </div>

        <div className="relative">
          <input
            className="w-full border rounded-lg px-3 py-2 pr-12"
            placeholder="Confirmar contraseña"
            type={showConfirm ? "text" : "password"}
            value={confirmar}
            onChange={(e) => setConfirmar(e.target.value)}
            required
          />
          <button
            type="button"
            aria-label={showConfirm ? "Ocultar contraseña de confirmación" : "Mostrar contraseña de confirmación"}
            onClick={() => setShowConfirm((s) => !s)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
          >
            {showConfirm ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
          </button>
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 rounded p-2">{error}</p>
        )}
        {ok && (
          <p className="text-sm text-green-700 bg-green-50 rounded p-2">{ok}</p>
        )}

        <button
          type="submit"
          disabled={cargando}
          className="w-full rounded-lg px-4 py-2 bg-[#7E3132] text-white disabled:opacity-60"
        >
          {cargando ? "Registrando..." : "Registrarme"}
        </button>
      </form>

      <p className="text-sm text-gray-600 text-center mt-4">
        ¿Ya tienes una cuenta?{" "}
        <Link
          to="/login"
          className="font-semibold text-[#7E3132] hover:underline"
        >
          Inicia sesión
        </Link>
      </p>
    </section>
  );
}
