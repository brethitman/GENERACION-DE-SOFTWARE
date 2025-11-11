// src/services/authService.ts
import api from "./api";

export interface Credenciales {
  correo: string;
  contrasena: string;
}

export interface Usuario {
  id: string;
  nombre: string;
  correo: string;
  rol: string;
}

export interface LoginResponse {
  ok: boolean;
  mensaje: string;
  datos: {
    usuario: Usuario;
    token: string;
  };
}

// 🔐 Login tradicional
export async function login({
  correo,
  contrasena,
}: Credenciales): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>("/autenticacion/login", {
    correo,
    contrasena,
  });
  return data;
}
