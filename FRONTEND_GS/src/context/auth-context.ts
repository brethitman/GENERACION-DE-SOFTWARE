import { createContext, useContext } from "react";
import type { UsuarioPublico } from "../types/Usuario";

export type Credenciales = { correo: string; contrasena: string };

export type EstadoAuth = {
  usuario: UsuarioPublico | null;
  token: string | null;
};

export type Ctx = {
  usuario: UsuarioPublico | null;
  token: string | null;
  estaAutenticado: boolean;
  iniciarSesion: (cred: Credenciales) => Promise<void>;
  cerrarSesion: () => void;
};

export const AuthContext = createContext<Ctx>({
  usuario: null,
  token: null,
  estaAutenticado: false,
  iniciarSesion: async () => {},
  cerrarSesion: () => {},
});

export const useAuth = () => useContext(AuthContext);
