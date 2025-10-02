import { pool } from "../infrastructure/db";

export type Rol = "docente" | "estudiante" | "administrador";
export type Usuario = { id: string; nombre: string; correo: string; rol: Rol; activo?: boolean };

export async function buscarPorCorreo(correo: string): Promise<(Usuario & { contrasena_hash?: string }) | null> {
  const q = `
    SELECT id_usuario, nombre_completo, correo, rol, activo, contrasena_hash
    FROM usuarios
    WHERE correo = $1
    LIMIT 1
  `;
  const { rows } = await pool.query(q, [correo]);
  if (rows.length === 0) return null;
  const r = rows[0];
  return {
    id: String(r.id_usuario),
    nombre: r.nombre_completo,
    correo: r.correo,
    rol: r.rol,
    activo: r.activo,
    contrasena_hash: r.contrasena_hash,
  };
}

export async function crearUsuario(params: {
  nombre: string;
  correo: string;
  contrasenaHash: string;
  rol: Rol;
}): Promise<Usuario> {
  const q = `
    INSERT INTO usuarios (nombre_completo, correo, contrasena_hash, rol, activo)
    VALUES ($1, $2, $3, $4, true)
    RETURNING id_usuario AS id, nombre_completo AS nombre, correo, rol
  `;
  const { rows } = await pool.query(q, [
    params.nombre,
    params.correo,
    params.contrasenaHash,
    params.rol,
  ]);
  return {
    id: String(rows[0].id),
    nombre: rows[0].nombre,
    correo: rows[0].correo,
    rol: rows[0].rol,
  };
}
