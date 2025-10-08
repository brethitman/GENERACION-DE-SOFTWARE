// components/RutaPrivada/RutaPrivada.tsx

// ===== External =====
import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

// ===== Internal =====
import { useAuth } from "../../hooks/useAuth";

type Props = { children: ReactNode };

export default function RutaPrivada({ children }: Props) {
  const location = useLocation();
  const { cargandoAuth, estaAutenticado } = useAuth();

  // Mientras hidratamos (lee localStorage en el provider), no pintes nada
  if (cargandoAuth) return null;

  // Si no está autenticado, manda a /login y recuerda desde dónde venía
  if (!estaAutenticado) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Autenticado: renderiza el contenido protegido
  return <>{children}</>;
}
