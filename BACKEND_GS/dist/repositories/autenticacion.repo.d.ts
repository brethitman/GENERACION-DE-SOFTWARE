export type UsuarioFila = {
    id_usuario: number;
    nombre_completo: string;
    correo: string;
    rol: "estudiante" | "docente" | "administrador";
    activo: boolean;
    contrasena_hash: string;
};
export type UsuarioPublico = Pick<UsuarioFila, "id_usuario" | "nombre_completo" | "correo" | "rol" | "activo">;
/**
 * Verifica un usuario por correo y contraseña.
 * Retorna los datos públicos del usuario o null si no coincide.
 */
export declare function verificarUsuario(correo: string, contrasena_plana: string): Promise<UsuarioPublico | null>;
//# sourceMappingURL=autenticacion.repo.d.ts.map