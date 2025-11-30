// src/context/AuthProvider.tsx

import { useEffect, useMemo, useState, type ReactNode } from "react";

import { setAuthToken } from "../services/api";
import { autenticarUsuario, verificarCodigo as verificarCodigoAPI, reenviarCodigo as reenviarCodigoAPI } from "../services/auth";
import type { UsuarioPublico } from "../types/Usuario";

import {
  AuthContext,
  type EstadoAuth,
  type Credenciales,
  type RespuestaLogin,
} from "./auth-context";

export default function ProveedorAuth({ children }: { children: ReactNode }) {
  const [estado, setEstado] = useState<EstadoAuth>({
    usuario: null,
    token: null,
  });
  const [cargandoAuth, setCargandoAuth] = useState(true);

  // Hidratar localStorage
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

  const iniciarSesion = async ({ correo, contrasena }: Credenciales): Promise<RespuestaLogin> => {
    const respuesta = await autenticarUsuario({ correo, contrasena });

    if (respuesta.requiereVerificacion) return respuesta;

    if (respuesta.datos) {
      const { usuario, token } = respuesta.datos;
      localStorage.setItem("token", token);
      localStorage.setItem("usuario", JSON.stringify(usuario));
      setAuthToken(token);
      setEstado({ token, usuario });
    }

    return respuesta;
  };

  const verificarCodigo = async (usuarioId: number, codigo: string): Promise<void> => {
    await verificarCodigoAPI(usuarioId, codigo);
  };

  const reenviarCodigo = async (usuarioId: number): Promise<void> => {
    await reenviarCodigoAPI(usuarioId);
  };

  // ⬅️ LOGIN CON GOOGLE
  const iniciarSesionConGoogle = () => {
    window.location.href = "http://localhost:3000/api/v1/autenticacion/google";
  };

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setAuthToken(null);
    setEstado({ token: null, usuario: null });
  };

  // ⬅️ PARA GOOGLE CALLBACK
  const setToken = (token: string | null) => {
    setEstado(prev => ({ ...prev, token }));
  };

  const setUsuario = (usuario: UsuarioPublico | null) => {
    setEstado(prev => ({ ...prev, usuario }));
  };

  const value = useMemo(
    () => ({
      usuario: estado.usuario,
      token: estado.token,
      estaAutenticado: Boolean(estado.token),
      cargandoAuth,

      iniciarSesion,
      verificarCodigo,
      reenviarCodigo,
      iniciarSesionConGoogle,

      cerrarSesion,

      setToken,     // ⬅️ requerido por GoogleCallback
      setUsuario,   // ⬅️ requerido por GoogleCallback
    }),
    [estado, cargandoAuth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
