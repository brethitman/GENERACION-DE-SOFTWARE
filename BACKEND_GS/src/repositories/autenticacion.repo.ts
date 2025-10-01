import { ejecutarFilas } from "../infrastructure/db";

export type UsuarioFila = {
  id_usuario: number;
  nombre_completo: string;
  correo: string;
  rol: "estudiante" | "docente" | "administrador";
  activo: boolean;
  contrasena_hash: string; // existe en la tabla, pero NO lo devolveremos en el SELECT
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
  const sql = `
    SELECT id_usuario, nombre_completo, correo, rol, activo
    FROM public.usuarios
    WHERE correo = $1
      AND contrasena_hash = crypt($2, contrasena_hash)
    LIMIT 1;
  `;

  const filas = await ejecutarFilas<UsuarioPublico>(sql, [correo, contrasena_plana]);

  // ✅ Usamos at(0) con nullish coalescing para evitar undefined
  return filas.at(0) ?? null;
}
