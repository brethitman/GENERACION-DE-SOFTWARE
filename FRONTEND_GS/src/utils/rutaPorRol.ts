export type Rol = "estudiante" | "docente" | "administrador";

export const rutaPorRol = (rol?: string) => {
  switch ((rol || "").toLowerCase()) {
    case "docente":
      return "/panel/docente";
    case "administrador":
      return "/panel/admin";
    case "estudiante":
    default:
      return "/panel/estudiante";
  }
};
