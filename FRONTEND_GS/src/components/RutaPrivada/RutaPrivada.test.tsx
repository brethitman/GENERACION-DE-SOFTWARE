
// src/components/RutaPrivada/RutaPrivada.test.tsx
import { vi } from "vitest";

/**
 * Mockear el hook antes de importar React/React Router o el componente que lo use.
 * Exponemos `mockAuthReturn` (mutable) para que cada test lo actualice.
 */
let mockAuthReturn = { estaAutenticado: false, cargandoAuth: false };

vi.mock("../../hooks/useAuth", () => {
  return {
    useAuth: () => mockAuthReturn,
  };
});

import { screen } from "@testing-library/react";
import { Route, Routes } from "react-router-dom";

import RutaPrivada from "./RutaPrivada";
import { renderWithAuth } from "../../test-utils/renderWithAuth";

function AppMock() {
  return (
    <Routes>
      <Route
        path="/privado"
        element={
          <RutaPrivada>
            <div>Contenido protegido</div>
          </RutaPrivada>
        }
      />
      <Route path="/login" element={<div>Login</div>} />
    </Routes>
  );
}

describe("<RutaPrivada />", () => {

  afterEach(() => {
    // restablecer al estado por defecto entre tests
    mockAuthReturn = { estaAutenticado: false, cargandoAuth: false };
    vi.clearAllMocks();
  });

  test("redirige a /login si no autenticado", () => {
    // controlar lo que devuelve useAuth para este test
    mockAuthReturn = { estaAutenticado: false, cargandoAuth: false };
    renderWithAuth(<AppMock />, { ctx: { estaAutenticado: false, cargandoAuth: false }, route: "/privado" });
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  test("muestra contenido protegido si autenticado", () => {

    mockAuthReturn = { estaAutenticado: true, cargandoAuth: false };
    renderWithAuth(<AppMock />, { ctx: { estaAutenticado: true, cargandoAuth: false }, route: "/privado" });
    expect(screen.getByText(/contenido protegido/i)).toBeInTheDocument();
  });
});
