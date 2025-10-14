// src/repositories/autenticacion.repo.ts
import bcrypt from "bcryptjs";

import { ejecutarFilas } from "../infrastructure/db";

export type UsuarioFila = {
  id_usuario: number;
  nombre_completo: string;
  correo: string;
  rol: "estudiante" | "docente" | "administrador";
  activo: boolean;
  contrasena_hash: string; // NO se expone hacia fuera
};

// Tipo público (sin contraseña)
export type UsuarioPublico = Pick<
  UsuarioFila,
  "id_usuario" | "nombre_completo" | "correo" | "rol" | "activo"
>;

/**
 * Verifica un usuario por correo y contraseña.
 * Retorna los datos públicos del usuario o null si no coincide.
 */
export async function verificarUsuario(
  correo: string,
  contrasena_plana: string
): Promise<UsuarioPublico | null> {
  // 1️⃣ Buscar el usuario por correo (incluir el hash)
  const sql = `
    SELECT 
      id_usuario,
      nombre_completo,
      correo::text AS correo,
      rol,
      activo,
      contrasena_hash
    FROM public.usuarios
    WHERE correo = $1
    LIMIT 1;
  `;

  const filas = await ejecutarFilas<UsuarioFila>(sql, [correo.trim()]);
  const u = filas.at(0);
  if (!u) return null; // no existe ese correo

  // 2️⃣ Comparar contraseña plana con hash usando bcrypt
  const coincide = await bcrypt.compare(contrasena_plana, u.contrasena_hash);
  if (!coincide) return null;

  // 3️⃣ Devolver el usuario sin incluir el hash
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { contrasena_hash, ...publico } = u;
  return publico;
}
