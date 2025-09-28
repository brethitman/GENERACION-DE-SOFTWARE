import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

import api from "../services/api";
import type { UsuarioPublico } from "../types/Usuario";

import { AuthContext, type EstadoAuth, type Credenciales } from "./auth-context";

export default function ProveedorAuth({ children }: { children: ReactNode }) {
  const [estado, setEstado] = useState<EstadoAuth>({ usuario: null, token: null });

  // Hidratar estado inicial desde localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    const uStr = localStorage.getItem("usuario");
    if (token && uStr) {
      try {
        const usuario = JSON.parse(uStr) as UsuarioPublico;
        setEstado({ token, usuario });
      } catch {
        // Si el JSON es inválido, lo limpiamos
        localStorage.removeItem("usuario");
      }
    }
  }, []);

  const iniciarSesion = async ({ correo, contrasena }: Credenciales) => {
    try {
      const { data } = await api.post("/api/v1/autenticacion/login", { correo, contrasena });

      const token = data?.datos?.token as string | undefined;
      const usuario = data?.datos?.usuario as UsuarioPublico | undefined;

      if (!token || !usuario) {
        throw new Error("Respuesta inválida del servidor");
      }

      localStorage.setItem("token", token);
      localStorage.setItem("usuario", JSON.stringify(usuario));
      setEstado({ token, usuario });
    } catch (e: unknown) {
      let msg = "No se pudo iniciar sesión";
      if (e instanceof Error) msg = e.message;
      throw new Error(msg);
    }
  };

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setEstado({ token: null, usuario: null });
  };

  const value = useMemo(
    () => ({
      usuario: estado.usuario,
      token: estado.token,
      estaAutenticado: Boolean(estado.token),
      iniciarSesion,
      cerrarSesion,
    }),
    [estado]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
