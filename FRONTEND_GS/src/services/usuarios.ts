import api from "./api";
import type { UsuarioPublico } from "../types/Usuario";

export async function listarUsuarios(): Promise<UsuarioPublico[]> {
  // Ajusta la ruta a tu backend si difiere:
  const { data } = await api.get("/api/v1/usuarios");
  // espera que data sea un array o {data:[...]} según tu API
  return Array.isArray(data) ? data : data?.data ?? [];
}
