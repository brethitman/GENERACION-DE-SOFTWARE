// src/context/AuthProvider.tsx

// ===== External =====
import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

// ===== Internal =====
import api, { setAuthToken } from "../services/api";
import type { UsuarioPublico } from "../types/Usuario";

import {
  AuthContext,
  type EstadoAuth,
  type Credenciales,
} from "./auth-context";

export default function ProveedorAuth({ children }: { children: ReactNode }) {
  const [estado, setEstado] = useState<EstadoAuth>({
    usuario: null,
    token: null,
  });
  const [cargandoAuth, setCargandoAuth] = useState(true);

  // Hidratar estado inicial desde localStorage al montar
  useEffect(() => {
    const token = localStorage.getItem("token");
    const uStr = localStorage.getItem("usuario");

    if (token && uStr) {
      try {
        const usuario = JSON.parse(uStr) as UsuarioPublico;
        setAuthToken(token);
        setEstado({ token, usuario });
      } catch {
        localStorage.removeItem("usuario");
      }
    }
    setCargandoAuth(false);
  }, []);

  // 👇 tu función corregida y usada más abajo
  const iniciarSesion = async ({ correo, contrasena }: Credenciales) => {
    const { data } = await api.post("/api/v1/autenticacion/login", {
      correo,
      contrasena,
    });

    const token = data?.datos?.token as string | undefined;
    const usuario = data?.datos?.usuario as UsuarioPublico | undefined;

    if (!token || !usuario)
      throw new Error("Respuesta inválida del servidor");

    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(usuario));
    setAuthToken(token);
    setEstado({ token, usuario });

    return usuario; // ✅ ahora se devuelve correctamente
  };

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setAuthToken(null);
    setEstado({ token: null, usuario: null });
  };

  // ✅ Aquí se usa iniciarSesion y ya no marcará error
  const value = useMemo(
    () => ({
      usuario: estado.usuario,
      token: estado.token,
      estaAutenticado: Boolean(estado.token),
      cargandoAuth,
      iniciarSesion,
      cerrarSesion,
    }),
    [estado, cargandoAuth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
