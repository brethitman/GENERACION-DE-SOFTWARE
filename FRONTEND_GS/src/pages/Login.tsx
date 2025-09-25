import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const [correo, setCorreo] = useState("ana.jaldin@gmail.com");
  const [contrasena, setContrasena] = useState("Ana#2025");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { iniciarSesion } = useAuth();
  const navigate = useNavigate();

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setCargando(true);
    try {
      await iniciarSesion({ correo, contrasena });
      navigate("/");
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message ?? "Error al iniciar sesión");
      } else {
        setError("Error al iniciar sesión");
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <section className="max-w-sm mx-auto bg-white rounded-xl border p-6 shadow-sm">
      <h1 className="text-xl font-semibold mb-4">Iniciar sesión</h1>

      <form onSubmit={enviar} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Correo</label>
          <input
            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="tu@correo.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Contraseña</label>
          <input
            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          disabled={cargando}
          className="w-full rounded-lg px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60"
        >
          {cargando ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
    </section>
  );
}
