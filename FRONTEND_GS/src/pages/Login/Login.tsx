import axios from "axios";               // ✅ 1. Librerías externas primero
import { useState } from "react";        // ✅ 2. React después
import { useNavigate } from "react-router-dom"; // ✅ 3. Otros módulos externos


export default function Login() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  //borrar luego
  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const { data } = await axios.post("/auth/login", { correo, contrasena });
      // el test mockea data.token
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch {
      setError("No se pudo iniciar sesión");
    }
  };

  return (
    <section className="max-w-sm mx-auto bg-white rounded-xl border p-6 shadow-sm">
      <h1 className="text-xl font-semibold mb-4">Iniciar sesión</h1>

      <form className="space-y-4" onSubmit={enviar}>
        <div>
          {/* 🔗 Asociación accesible */}
          <label htmlFor="email" className="block text-sm mb-1">
            Correo
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="tu@correo.com"
            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
        </div>

        <div>
          {/* 🔗 Asociación accesible */}
          <label htmlFor="password" className="block text-sm mb-1">
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            placeholder="••••••••"
            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          className="w-full rounded-lg px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60"
          disabled={cargando}
          className="w-full rounded-lg px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60"
        >
          Ingresar
        </button>
      </form>
    </section>
  );
}
