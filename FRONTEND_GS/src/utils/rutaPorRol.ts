//C:\Users\Ffcg\Videos\GENERACION_DE_SOFTWARE\FRONTEND_GS\src\utils\rutaPorRol.ts
export type Rol = "estudiante" | "editor" | "ejecutor" | "administrador";

export const rutaPorRol = (rol?: string) => {
  switch ((rol || "").toLowerCase()) {
    case "editor":
      return "/panel/docente-editor";
    case "ejecutor":
      return "/panel/docente-ejecutor";
    case "administrador":
      return "/panel/admin";
    case "estudiante":
    default:
      return "/panel/estudiante";
  }
};
