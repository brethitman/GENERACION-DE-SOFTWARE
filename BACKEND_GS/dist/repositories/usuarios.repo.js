"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buscarPorCorreo = buscarPorCorreo;
exports.crearUsuario = crearUsuario;
//usuarios.repo.ts
const db_1 = require("../infrastructure/db");
async function buscarPorCorreo(correo) {
    const q = `
    SELECT id_usuario, nombre_completo, correo, rol, activo, contrasena_hash
    FROM usuarios
    WHERE correo = $1
    LIMIT 1
  `;
    const { rows } = await db_1.pool.query(q, [correo]);
    if (rows.length === 0)
        return null;
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
async function crearUsuario(params) {
    const q = `
    INSERT INTO usuarios (nombre_completo, correo, contrasena_hash, rol, activo)
    VALUES ($1, $2, $3, $4, true)
    RETURNING id_usuario AS id, nombre_completo AS nombre, correo, rol
  `;
    const { rows } = await db_1.pool.query(q, [
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
//# sourceMappingURL=usuarios.repo.js.map