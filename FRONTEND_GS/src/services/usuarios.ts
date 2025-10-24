
import type { UsuarioPublico, Rol } from "../types/Usuario";

import api from "./api";

export async function listarUsuarios(): Promise<UsuarioPublico[]> {
  const { data } = await api.get("/api/v1/usuarios");
  return Array.isArray(data) ? data : data?.data ?? [];
}

// ===== Registro =====
export interface RegistroRequest {
  nombre: string;
  correo: string;
  contrasena: string;
  rol?: Rol;
}

export interface RegistroResponse {
  ok: boolean;
  mensaje: string;
  requiereVerificacion?: boolean; // ✅ AGREGAR ESTO
  usuarioId?: number; // ✅ AGREGAR ESTO
  datos?: { // ✅ HACER datos OPCIONAL con ?
    usuario: UsuarioPublico;
    token: string;
  };
}

export async function registrarUsuario(payload: RegistroRequest): Promise<RegistroResponse> {
  const { data } = await api.post<RegistroResponse>(
    "/api/v1/autenticacion/registro",
    payload
  );
  return data;
}
