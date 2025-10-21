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
