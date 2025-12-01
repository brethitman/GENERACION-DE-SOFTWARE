//C:\Users\Ffcg\Music\main de main\google\GENERACION-DE-SOFTWARE\FRONTEND_GS\src\context\AuthProvider.tsx
import type { ReactNode } from "react";

import { useProvideAuth } from "../hooks/useProvideAuth";

import { AuthContext } from "./auth-context";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useProvideAuth();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}
