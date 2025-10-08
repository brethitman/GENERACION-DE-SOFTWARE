// src/test-utils/renderWithAuth.tsx

import { render } from "@testing-library/react";
import type { ReactElement } from "react";
import { MemoryRouter } from "react-router-dom";

import { AuthContext, type Ctx } from "../context/auth-context"; // ← grupo interno (separado por 1 línea)

const defaultCtx: Ctx = {
  usuario: null,
  token: null,
  estaAutenticado: false,
  cargandoAuth: false,
  iniciarSesion: async () => {
    throw new Error("iniciarSesion no mockeado");
  },
  cerrarSesion: () => {},
};

export function renderWithAuth(
  ui: ReactElement,
  {
    ctx,
    route = "/",
  }: { ctx?: Partial<Ctx>; route?: string } = {}
) {
  const value: Ctx = { ...defaultCtx, ...ctx };

  return render(
    <AuthContext.Provider value={value}>
      <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
    </AuthContext.Provider>
  );
}
