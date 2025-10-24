export type Rol = "estudiante" | "editor" | "ejecutor" | "administrador";

export interface UsuarioPublico {
  id: number;
  nombre: string;
  correo: string;
  rol: Rol;
  activo: boolean; // ✅ Agregar esta propiedad
  verificado: boolean; // ✅ Agregar esta propiedad
}
