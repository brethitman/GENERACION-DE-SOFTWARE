import { createContext, useContext } from "react";

import type { UsuarioPublico } from "../types/Usuario";

export type Credenciales = { correo: string; contrasena: string };

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

export type EstadoAuth = {
  usuario: UsuarioPublico | null;
  token: string | null;
};

export type Ctx = {
  usuario: UsuarioPublico | null;
  token: string | null;
  estaAutenticado: boolean;
  cargandoAuth: boolean;
  iniciarSesion: (cred: Credenciales) => Promise<RespuestaLogin>;
  verificarCodigo: (id: number, codigo: string) => Promise<void>;
  reenviarCodigo: (id: number) => Promise<void>;
  cerrarSesion: () => void;
};

export const AuthContext = createContext<Ctx>({
  usuario: null,
  token: null,
  estaAutenticado: false,
  cargandoAuth: true,

  iniciarSesion: async () => ({ ok: false, mensaje: "" }),
  verificarCodigo: async () => Promise.resolve(),
  reenviarCodigo: async () => Promise.resolve(),
  cerrarSesion: () => {}
});

export const useAuth = () => useContext(AuthContext);
