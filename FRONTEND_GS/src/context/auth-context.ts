
import { createContext, useContext } from "react";

import type { UsuarioPublico } from "../types/Usuario";

export type Credenciales = { correo: string; contrasena: string };

export type EstadoAuth = {
  usuario: UsuarioPublico | null;
  token: string | null;
};

// ✅ NUEVO: Tipo para respuesta de login con verificación
export type RespuestaLogin = {
  ok: boolean;
  mensaje: string;
  requiereVerificacion?: boolean;
  usuarioId?: number;
  datos?: {
    usuario: UsuarioPublico;
    token: string;
  };
};

export type Ctx = {
  usuario: UsuarioPublico | null;
  token: string | null;
  estaAutenticado: boolean;
  cargandoAuth: boolean;
  iniciarSesion: (cred: Credenciales) => Promise<RespuestaLogin>; // ✅ Cambiar el tipo de retorno
  verificarCodigo: (usuarioId: number, codigo: string) => Promise<void>; // ✅ AGREGAR ESTA LÍNEA
  reenviarCodigo: (usuarioId: number) => Promise<void>; // ✅ AGREGAR ESTA LÍNEA
  cerrarSesion: () => void;
};

export const AuthContext = createContext<Ctx>({
  usuario: null,
  token: null,
  estaAutenticado: false,
  cargandoAuth: true,

  iniciarSesion: async () => Promise.resolve({} as RespuestaLogin), // ✅ Cambiar el tipo
  verificarCodigo: async () => Promise.resolve(), // ✅ AGREGAR ESTA LÍNEA
  reenviarCodigo: async () => Promise.resolve(), // ✅ AGREGAR ESTA LÍNEA
  cerrarSesion: () => {},
});

export const useAuth = () => useContext(AuthContext);
