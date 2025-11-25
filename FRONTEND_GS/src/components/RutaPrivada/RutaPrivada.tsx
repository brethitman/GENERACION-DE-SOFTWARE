// components/RutaPrivada/RutaPrivada.tsx

import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "../../context/auth-context";  

type Props = { children: ReactNode };

export default function RutaPrivada({ children }: Props) {
  const location = useLocation();
  const { cargandoAuth, estaAutenticado } = useAuth();

  // Mientras hidratamos auth, no mostramos nada
  if (cargandoAuth) return null;

  // Si no está autenticado → enviar al login
  if (!estaAutenticado) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Todo OK → render protegido
  return <>{children}</>;
}
