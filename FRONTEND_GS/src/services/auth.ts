import type { Credenciales, RespuestaLogin } from "../context/auth-context";

import api from "./api";

// ✅ Servicio de autenticación
export async function autenticarUsuario(credenciales: Credenciales): Promise<RespuestaLogin> {
  const { data } = await api.post<RespuestaLogin>("/api/v1/autenticacion/login", credenciales);
  return data;
}

// ✅ Verificar código
export async function verificarCodigo(usuarioId: number, codigo: string): Promise<void> {
  const { data } = await api.post<{ ok: boolean; mensaje: string }>(
    "/api/v1/autenticacion/verificar-codigo",
    { usuarioId, codigo }
  );
  
  if (!data.ok) {
    throw new Error(data.mensaje);
  }
}

// ✅ Reenviar código
export async function reenviarCodigo(usuarioId: number): Promise<void> {
  const { data } = await api.post<{ ok: boolean; mensaje: string }>(
    "/api/v1/autenticacion/reenviar-codigo",
    { usuarioId }
  );
  
  if (!data.ok) {
    throw new Error(data.mensaje);
  }
}