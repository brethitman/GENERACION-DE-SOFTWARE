export type Rol = "docente" | "estudiante" | "administrador";
export type Usuario = {
    id: string;
    nombre: string;
    correo: string;
    rol: Rol;
    activo?: boolean;
};
export declare function buscarPorCorreo(correo: string): Promise<(Usuario & {
    contrasena_hash?: string;
}) | null>;
export declare function crearUsuario(params: {
    nombre: string;
    correo: string;
    contrasenaHash: string;
    rol: Rol;
}): Promise<Usuario>;
//# sourceMappingURL=usuarios.repo.d.ts.map