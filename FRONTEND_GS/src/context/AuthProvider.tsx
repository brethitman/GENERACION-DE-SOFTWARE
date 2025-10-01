import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import api from "../services/api";
import type { UsuarioPublico } from "../types/Usuario";
import { AuthContext, type EstadoAuth, type Credenciales, type DatosRegistro } from "./auth-context";

export default function ProveedorAuth({ children }: { children: ReactNode }) {
  const [estado, setEstado] = useState<EstadoAuth>({ usuario: null, token: null });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const uStr = localStorage.getItem("usuario");
    if (token && uStr) {
      try {
        const usuario = JSON.parse(uStr) as UsuarioPublico;
        setEstado({ token, usuario });
      } catch {
        localStorage.removeItem("usuario");
      }
    }
  }, []);

  const iniciarSesion = async ({ correo, contrasena }: Credenciales) => {
    try {
      const { data } = await api.post("/api/v1/autenticacion/login", { correo, contrasena });
      const token = data?.datos?.token;
      const usuario = data?.datos?.usuario;

      if (!token || !usuario) {
        throw new Error("Respuesta inválida del servidor");
      }

      localStorage.setItem("token", token);
      localStorage.setItem("usuario", JSON.stringify(usuario));
      setEstado({ token, usuario });
    } catch (e: unknown) {
      throw new Error(e instanceof Error ? e.message : "No se pudo iniciar sesión");
    }
  };

  const registrar = async ({ nombre, correo, contrasena }: DatosRegistro) => {
    try {
      const { data } = await api.post("/api/v1/autenticacion/registro", { nombre, correo, contrasena });
      const token = data?.datos?.token;
      const usuario = data?.datos?.usuario;

      if (!token || !usuario) {
        throw new Error("Respuesta inválida del servidor");
      }

      localStorage.setItem("token", token);
      localStorage.setItem("usuario", JSON.stringify(usuario));
      setEstado({ token, usuario });
    } catch (e: unknown) {
      throw new Error(e instanceof Error ? e.message : "No se pudo registrar el usuario");
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
      registrar,
      cerrarSesion,
    }),
    [estado]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}