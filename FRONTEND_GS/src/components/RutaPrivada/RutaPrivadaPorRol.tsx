// components/RutaPrivada/RutaPrivadaPorRol.tsx

import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "../../context/auth-context";

type Props = {
  children: ReactNode;
  rolesPermitidos: string[];
};

export default function RutaPrivadaPorRol({ children, rolesPermitidos }: Props) {
  const { usuario, cargandoAuth, estaAutenticado } = useAuth();
  const location = useLocation();

  if (cargandoAuth) return null;

  if (!estaAutenticado) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // ACCESO DENEGADO POR ROL
  if (!usuario || !rolesPermitidos.includes(usuario.rol.toLowerCase())) {
    return <Navigate to="/panel/estudiante" replace />;
  }

  return <>{children}</>;
}
