import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import { rutaPorRol, type Rol } from "../../utils/rutaPorRol";

// type guard para validar rol
const isRol = (x: string): x is Rol =>
  ["estudiante", "editor", "ejecutor", "administrador"].includes(x);

export function RutaProtegida() {
  const { cargandoAuth, estaAutenticado } = useAuth();
  if (cargandoAuth) return null;
  return estaAutenticado ? <Outlet /> : <Navigate to="/login" replace />;
}

export function RutaPorRol({ allow }: { allow: Rol[] }) {
  const { cargandoAuth, usuario } = useAuth();
  if (cargandoAuth) return null;

  const rn = (usuario?.rol || "").toLowerCase();
  const rol: Rol = isRol(rn) ? rn : "estudiante";

  return allow.includes(rol)
    ? <Outlet />
    : <Navigate to={rutaPorRol(rol)} replace />;
}
