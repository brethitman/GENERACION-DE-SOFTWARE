import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import { rutaPorRol } from "../../utils/rutaPorRol"; // 👈 la volvemos a usar

export default function Login() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

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
    <section className="max-w-sm mx-auto bg-white rounded-xl border p-6 shadow-sm">
      <h1 className="text-xl font-semibold mb-4 text-center">Iniciar sesión</h1>
      <form className="space-y-4" onSubmit={enviar}>
        <div>
          <label htmlFor="email" className="block text-sm mb-1 font-medium">
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            required
            placeholder="tu@correo.com"
            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm mb-1 font-medium">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            required
            placeholder="••••••••"
            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 rounded-md p-2">{error}</p>
        )}

        <button
          type="submit"
          className="w-full rounded-lg px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60 transition-all"
          disabled={cargando}
        >
          {cargando ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
    </section>
  );
}
