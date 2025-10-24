// src/context/AuthProvider.tsx

// ===== External =====
import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

// ===== Internal =====

import { setAuthToken } from "../services/api";
import { autenticarUsuario, verificarCodigo as verificarCodigoAPI, reenviarCodigo as reenviarCodigoAPI } from "../services/auth";
import type { UsuarioPublico } from "../types/Usuario";

import {
  AuthContext,
  type EstadoAuth,
  type Credenciales,
  type RespuestaLogin,
} from "./auth-context";

// ✅ Importar servicios de autenticación

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

  // ✅ Función de inicio de sesión actualizada
  const iniciarSesion = async ({ correo, contrasena }: Credenciales): Promise<RespuestaLogin> => {
    const respuesta = await autenticarUsuario({ correo, contrasena });
    
    // ✅ Si requiere verificación, retornamos la respuesta sin guardar en localStorage
    if (respuesta.requiereVerificacion) {
      return respuesta;
    }

    // ✅ Si está verificado, procedemos normalmente
    if (respuesta.datos) {
      const { usuario: usuarioData, token: tokenData } = respuesta.datos;
      
      localStorage.setItem("token", tokenData);
      localStorage.setItem("usuario", JSON.stringify(usuarioData));
      setAuthToken(tokenData);
      setEstado({ token: tokenData, usuario: usuarioData });
    }
    
    return respuesta;
  };

  // ✅ Función para verificar código
  const verificarCodigo = async (usuarioId: number, codigo: string): Promise<void> => {
    await verificarCodigoAPI(usuarioId, codigo);
  };

  // ✅ Función para reenviar código
  const reenviarCodigo = async (usuarioId: number): Promise<void> => {
  await reenviarCodigoAPI(usuarioId);
};

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setAuthToken(null);
    setEstado({ token: null, usuario: null });
  };

  // ✅ Value actualizado con todas las funciones
  const value = useMemo(
    () => ({
      usuario: estado.usuario,
      token: estado.token,
      estaAutenticado: Boolean(estado.token),
      cargandoAuth,
      iniciarSesion,
      verificarCodigo,
      reenviarCodigo,
      cerrarSesion,
    }),
    [estado, cargandoAuth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;

}
