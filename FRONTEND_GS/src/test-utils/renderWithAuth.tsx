import { render } from "@testing-library/react";
import type { ReactElement } from "react";
import { MemoryRouter } from "react-router-dom";

import { AuthContext, type Ctx } from "../context/auth-context";

const defaultCtx: Ctx = {
  usuario: null,
  token: null,
  estaAutenticado: false,
  cargandoAuth: false,
  iniciarSesion: async () => {
    throw new Error("iniciarSesion no mockeado");
  },
  cerrarSesion: () => { },
  // ✅ AGREGADAS LAS NUEVAS FUNCIONES
  verificarCodigo: async (_usuarioId: number, _codigo: string): Promise<void> => {
    throw new Error("verificarCodigo no mockeado");
  },
  reenviarCodigo: async (_usuarioId: number): Promise<void> => {
    throw new Error("reenviarCodigo no mockeado");
  }
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

// ✅ FUNCIONES MOCK PARA TESTS
export const verificarCodigo = async (_usuarioId: number, _codigo: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return { ok: true, mensaje: "Código verificado" };
};

export const reenviarCodigo = async (_usuarioId: number) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return { ok: true, mensaje: "Código reenviado" };
};