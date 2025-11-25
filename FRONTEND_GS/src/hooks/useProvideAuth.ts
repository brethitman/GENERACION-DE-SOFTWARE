import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import type { Credenciales, RespuestaLogin } from "../context/auth-context";
import { setAuthToken } from "../services/api";
import { autenticarUsuario, verificarCodigo as verificarCodigoAPI, reenviarCodigo as reenviarCodigoAPI } from "../services/auth";
import type { UsuarioPublico } from "../types/Usuario";
import { rutaPorRol } from "../utils/rutaPorRol";

export function useProvideAuth() {
  const [usuario, setUsuario] = useState<UsuarioPublico | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [cargandoAuth, setCargandoAuth] = useState(true);

  const navigate = useNavigate();

  // Hidratar Auth al arrancar
  useEffect(() => {
    const tk = localStorage.getItem("token");
    const uStr = localStorage.getItem("usuario");

    if (tk && uStr) {
      try {
        const u = JSON.parse(uStr) as UsuarioPublico;
        setAuthToken(tk);
        setToken(tk);
        setUsuario(u);
      } catch {
        localStorage.removeItem("usuario");
      }
    }

    setCargandoAuth(false);
  }, []);

  // Iniciar sesión
  const iniciarSesion = useCallback(async (cred: Credenciales): Promise<RespuestaLogin> => {
    const respuesta = await autenticarUsuario(cred);

    if (respuesta.requiereVerificacion) {
      return respuesta;
    }

    if (respuesta.datos) {
      const { usuario: u, token: tk } = respuesta.datos;

      localStorage.setItem("token", tk);
      localStorage.setItem("usuario", JSON.stringify(u));
      setAuthToken(tk);

      setToken(tk);
      setUsuario(u);

      navigate(rutaPorRol(u.rol), { replace: true });
    }

    return respuesta;
  }, [navigate]);

  const verificarCodigo = async (id: number, codigo: string) => {
    await verificarCodigoAPI(id, codigo);
  };

  const reenviarCodigo = async (id: number) => {
    await reenviarCodigoAPI(id);
  };

  const cerrarSesion = () => {
    setUsuario(null);
    setToken(null);

    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setAuthToken(null);

    navigate("/login", { replace: true });
  };

  return {
    usuario,
    token,
    estaAutenticado: !!usuario && !!token,
    cargandoAuth,
    iniciarSesion,
    verificarCodigo,
    reenviarCodigo,
    cerrarSesion,
  };
}

export { useProvideAuth as useAuth };
