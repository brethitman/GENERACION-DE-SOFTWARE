import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";

export default function RutaPrivada({ children }: { children: ReactNode }) {
  const { estaAutenticado } = useAuth();
  if (!estaAutenticado) return <Navigate to="/login" replace />;
  return <>{children}</>;
}
