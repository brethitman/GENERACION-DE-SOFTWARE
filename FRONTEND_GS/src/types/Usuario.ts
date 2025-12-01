//C:\Users\Ffcg\Music\main de main\google\GENERACION-DE-SOFTWARE\FRONTEND_GS\src\types\Usuario.ts
export type Rol = "estudiante" | "editor" | "ejecutor" | "administrador";

export interface UsuarioPublico {
  id: number;
  nombre: string;
  correo: string;
  rol: Rol;
  activo: boolean; // ✅ Agregar esta propiedad
  verificado: boolean; // ✅ Agregar esta propiedad
}
