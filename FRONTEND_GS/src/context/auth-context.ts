import { createContext, useContext } from "react";

import type { UsuarioPublico } from "../types/Usuario";

export type Credenciales = {
  correo: string;
  contrasena: string;
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
  iniciarSesion: (cred: Credenciales) => Promise<UsuarioPublico>;
  iniciarSesionConGoogle: () => void;
  cerrarSesion: () => void;
  setToken: (token: string | null) => void;
  setUsuario: (usuario: UsuarioPublico | null) => void;
};

export const AuthContext = createContext<Ctx>({
  usuario: null,
  token: null,
  estaAutenticado: false,
  cargandoAuth: true,
  iniciarSesion: async () => Promise.resolve({} as UsuarioPublico),
  iniciarSesionConGoogle: () => {},
  cerrarSesion: () => {},
  setToken: () => {},
  setUsuario: () => {},
});

export const useAuth = (): Ctx => useContext(AuthContext);
