export type Rol = "estudiante" | "docente" | "administrador";

export interface UsuarioPublico {
  id: number;
  nombre: string;
  correo: string;
  rol: Rol;
  activo: boolean; // ✅ Agregar esta propiedad
  verificado: boolean; // ✅ Agregar esta propiedad
}