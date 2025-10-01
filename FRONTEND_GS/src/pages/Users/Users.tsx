// src/pages/Users/Users.tsx
import { useEffect, useState } from "react";

import api from "../../services/api";
import type { UsuarioPublico } from "../../types/Usuario";


export default function Users() {
  const [usuarios, setUsuarios] = useState<UsuarioPublico[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/api/v1/usuarios");
        setUsuarios(Array.isArray(data) ? data : data?.data ?? []);
      } catch (e: unknown) {
        if (e instanceof Error) setError(e.message);
        else setError("Error desconocido");
      } finally {
        setCargando(false);
      }
    })();
  }, []);

  if (cargando) return <p className="animate-pulse text-gray-500">Cargando…</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <section className="space-y-3">
      <h1 className="text-xl font-semibold">Usuarios</h1>
      {usuarios.length === 0 ? (
        <p>No hay usuarios.</p>
      ) : (
        <ul className="space-y-2">
          {usuarios.map((u) => (
            <li
              key={u.id}
              className="border rounded-lg px-3 py-2 flex items-center justify-between"
            >
              <div>
                <p className="font-medium">{u.nombre}</p>
                <p className="text-sm text-gray-600">{u.correo}</p>
              </div>
              <span className="text-xs uppercase text-gray-700">{u.rol}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
