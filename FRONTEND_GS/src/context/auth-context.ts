// src/context/auth-context.ts

import { createContext, useContext } from "react";

import type { UsuarioPublico } from "../types/Usuario";

export type Credenciales = { correo: string; contrasena: string };

export type EstadoAuth = {
  usuario: UsuarioPublico | null;
  token: string | null;
};

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

  iniciarSesion: (cred: Credenciales) => Promise<RespuestaLogin>;
  verificarCodigo: (usuarioId: number, codigo: string) => Promise<void>;
  reenviarCodigo: (usuarioId: number) => Promise<void>;

  // ⬅️ AGREGAR ESTO
  iniciarSesionConGoogle: () => void;
  setToken: (token: string | null) => void;
  setUsuario: (usuario: UsuarioPublico | null) => void;

  cerrarSesion: () => void;
};

export const AuthContext = createContext<Ctx>({
  usuario: null,
  token: null,
  estaAutenticado: false,
  cargandoAuth: true,

  iniciarSesion: async () => Promise.resolve({} as RespuestaLogin),
  verificarCodigo: async () => Promise.resolve(),
  reenviarCodigo: async () => Promise.resolve(),

  // ⬅️ NUEVOS
  iniciarSesionConGoogle: () => {},
  setToken: () => {},
  setUsuario: () => {},

  cerrarSesion: () => {},
});

export const useAuth = () => useContext(AuthContext);
