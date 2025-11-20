import { useEffect, useMemo, useState, type ReactNode } from "react";

import api, { setAuthToken } from "../../src/services/api";
import type { UsuarioPublico } from "../../src/types/Usuario";

import { AuthContext, type EstadoAuth, type Credenciales } from "./auth-context";

export default function ProveedorAuth({ children }: { children: ReactNode }): JSX.Element {
  const [estado, setEstado] = useState<EstadoAuth>({
    usuario: null,
    token: null,
  });
  const [cargandoAuth, setCargandoAuth] = useState<boolean>(true);

  const iniciarSesion = async ({ correo, contrasena }: Credenciales): Promise<UsuarioPublico> => {
    const { data } = await api.post<{ ok: boolean; mensaje: string; datos: { usuario: UsuarioPublico; token: string } }>("/api/v1/autenticacion/login", {
      correo,
      contrasena,
    });
    const token: string | undefined = data?.datos?.token;
    const usuario: UsuarioPublico | undefined = data?.datos?.usuario;
    if (!token || !usuario) {
      throw new Error("Respuesta inválida del servidor");
    }
    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(usuario));
    setAuthToken(token);
    setEstado({ token, usuario });
    return usuario;
  };

  const iniciarSesionConGoogle = (): void => {
    window.location.href = "http://localhost:3000/api/v1/autenticacion/google";
  };

  const cerrarSesion = (): void => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setAuthToken(null);
    setEstado({ token: null, usuario: null });
  };

  useEffect(() => {
    const token: string | null = localStorage.getItem("token");
    const usuarioString: string | null = localStorage.getItem("usuario");

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

  const value = useMemo(
    () => ({
      usuario: estado.usuario,
      token: estado.token,
      estaAutenticado: Boolean(estado.token),
      cargandoAuth,
      iniciarSesion,
      iniciarSesionConGoogle,
      cerrarSesion,
      setToken: (token: string | null): void => setEstado(prev => ({ ...prev, token })),
      setUsuario: (usuario: UsuarioPublico | null): void => setEstado(prev => ({ ...prev, usuario })),
    }),
    [estado, cargandoAuth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
