// src/test-utils/renderWithProviders.tsx
import { render } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";

import { AuthContext, type Ctx } from "../context/auth-context";

interface Options {
  authValue?: Partial<Ctx>;
  route?: string;
}

export function renderWithProviders(
  ui: React.ReactNode,
  { authValue = {}, route = "/" }: Options = {}
) {
  const defaultAuth: Ctx = {
    usuario: null,
    token: null,
    estaAutenticado: false,
    cargandoAuth: false,
    iniciarSesion: async () => ({ ok: false, mensaje: "" }),
    verificarCodigo: async () => Promise.resolve(),
    reenviarCodigo: async () => Promise.resolve(),
    cerrarSesion: () => {},
    ...authValue,
  };

  return render(
    <AuthContext.Provider value={defaultAuth}>
      <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
    </AuthContext.Provider>
  );
}
