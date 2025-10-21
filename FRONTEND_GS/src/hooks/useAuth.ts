import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { type Credenciales, type RespuestaLogin } from "../context/auth-context";
import { setAuthToken } from "../services/api";
import { autenticarUsuario, verificarCodigo as verificarCodigoAPI, reenviarCodigo as reenviarCodigoAPI } from "../services/auth";
import type { UsuarioPublico } from "../types/Usuario";
import { rutaPorRol } from "../utils/rutaPorRol";

export function useAuth() {
  const [usuario, setUsuario] = useState<UsuarioPublico | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [cargandoAuth, setCargandoAuth] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const tokenGuardado = localStorage.getItem("token");
    const usuarioGuardado = localStorage.getItem("usuario");

    if (tokenGuardado && usuarioGuardado) {
      try {
        setToken(tokenGuardado);
        setUsuario(JSON.parse(usuarioGuardado));
        setAuthToken(tokenGuardado);
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
      }
    }
    setCargandoAuth(false);
  }, []);

  // ✅ CORREGIDO: Sin try/catch innecesario
  const iniciarSesion = useCallback(async (cred: Credenciales): Promise<RespuestaLogin> => {
    const respuesta = await autenticarUsuario(cred);
    
    // ✅ Si requiere verificación, retornamos la respuesta sin guardar en localStorage
    if (respuesta.requiereVerificacion) {
      return respuesta;
    }

    // ✅ Si está verificado, procedemos normalmente
    if (respuesta.datos) {
      const { usuario: usuarioData, token: tokenData } = respuesta.datos;
      
      setUsuario(usuarioData);
      setToken(tokenData);
      setAuthToken(tokenData);
      
      localStorage.setItem("token", tokenData);
      localStorage.setItem("usuario", JSON.stringify(usuarioData));
      
      // Navegar a la ruta correspondiente
      navigate(rutaPorRol(usuarioData.rol), { replace: true });
    }
    
    return respuesta;
  }, [navigate]);

  // ✅ Verificar código
  const verificarCodigo = useCallback(async (usuarioId: number, codigo: string): Promise<void> => {
    await verificarCodigoAPI(usuarioId, codigo);
  }, []);

  // ✅ Reenviar código
  const reenviarCodigo = useCallback(async (usuarioId: number): Promise<void> => {
    await reenviarCodigoAPI(usuarioId);
  }, []);

  // ✅ Cerrar sesión
  const cerrarSesion = useCallback(() => {
    setUsuario(null);
    setToken(null);
    setAuthToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/login", { replace: true });
  }, [navigate]);

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