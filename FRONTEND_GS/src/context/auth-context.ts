// src/context/auth-context.ts
import { createContext, useContext } from "react";

import type { UsuarioPublico } from "../utils/types/Usuario";

export type Credenciales = { correo: string; contrasena: string };

export type EstadoAuth = {
  usuario: UsuarioPublico | null;
  token: string | null;
};

export type Ctx = {
  usuario: UsuarioPublico | null;
  token: string | null;
  estaAutenticado: boolean;
  cargandoAuth: boolean;
  iniciarSesion: (cred: Credenciales) => Promise<UsuarioPublico>; // 👈 cambia aquí
  cerrarSesion: () => void;
};

export const AuthContext = createContext<Ctx>({
  usuario: null,
  token: null,
  estaAutenticado: false,
  cargandoAuth: true,
  iniciarSesion: async () => Promise.resolve({} as UsuarioPublico), // 👈 placeholder tipado
  cerrarSesion: () => {},
});

export const useAuth = () => useContext(AuthContext);
