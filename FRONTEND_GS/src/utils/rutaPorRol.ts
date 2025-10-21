export type Rol = "estudiante" | "docente editor" | "administrador";

export const rutaPorRol = (rol?: string) => {
  switch ((rol || "").toLowerCase()) {
    case "docente editor":
      return "/panel/docente-editor";
    case "administrador":
      return "/panel/admin";
    case "estudiante":
    default:
      return "/panel/estudiante";
  }
};
