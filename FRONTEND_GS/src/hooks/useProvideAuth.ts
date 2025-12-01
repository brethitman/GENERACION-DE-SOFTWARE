import { useEffect, useState, useCallback } from "react";

import type {
  Credenciales,
  RespuestaLogin,
  EstadoAuth
} from "../context/auth-context";
import api, { setAuthToken } from "../services/api";
import type { UsuarioPublico } from "../types/Usuario";

export function useProvideAuth() {
  const [estado, setEstado] = useState<EstadoAuth>({
    usuario: null,
    token: null,
  });
  const [cargandoAuth, setCargandoAuth] = useState(true);

  // 🔐 LOGIN TRADICIONAL
  const iniciarSesion = async (cred: Credenciales): Promise<RespuestaLogin> => {
    const { data } = await api.post<RespuestaLogin>(
      "/api/v1/autenticacion/login",
      cred
    );

    if (data.requiereVerificacion) {
      return data; // NO guardamos token
    }

    if (data.datos?.usuario && data.datos?.token) {
      const token = data.datos.token;
      const usuario = data.datos.usuario;

      localStorage.setItem("token", token);
      localStorage.setItem("usuario", JSON.stringify(usuario));
      setAuthToken(token);
      setEstado({ token, usuario });
    }

    return data;
  };

  // 🔐 VERIFICAR CÓDIGO
  const verificarCodigo = async (usuarioId: number, codigo: string) => {
    await api.post("/api/v1/autenticacion/verificar-codigo", {
      usuarioId,
      codigo,
    });
  };

  // 🔁 REENVIAR CÓDIGO
  const reenviarCodigo = async (usuarioId: number) => {
    await api.post("/api/v1/autenticacion/reenviar-codigo", { usuarioId });
  };

  // 🚀 GOOGLE LOGIN
  const iniciarSesionConGoogle = useCallback(() => {
    window.location.href =
      "http://localhost:3000/api/v1/autenticacion/google";
  }, []);

  // 🔄 CERRAR SESIÓN
  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setAuthToken(null);
    setEstado({ usuario: null, token: null });
  };

  // 🧊 Hidratar sesión
  useEffect(() => {
    const token = localStorage.getItem("token");
    const usuarioString = localStorage.getItem("usuario");

    if (token && usuarioString) {
      try {
        const usuario: UsuarioPublico = JSON.parse(usuarioString);
        setAuthToken(token);
        setEstado({ token, usuario });
      } catch {
        localStorage.removeItem("usuario");
      }
    }

    setCargandoAuth(false);
  }, []);

  return {
    usuario: estado.usuario,
    token: estado.token,
    estaAutenticado: Boolean(estado.token),
    cargandoAuth,

    iniciarSesion,
    verificarCodigo,
    reenviarCodigo,
    cerrarSesion,

    iniciarSesionConGoogle,
    setToken: (token: string | null) =>
      setEstado((prev) => ({ ...prev, token })),
    setUsuario: (usuario: UsuarioPublico | null) =>
      setEstado((prev) => ({ ...prev, usuario })),
  };
}
