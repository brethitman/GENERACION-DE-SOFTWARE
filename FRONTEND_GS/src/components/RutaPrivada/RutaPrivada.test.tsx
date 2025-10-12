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
  test("redirige a /login si no autenticado", () => {
    renderWithAuth(<AppMock />, { ctx: { estaAutenticado: false, cargandoAuth: false }, route: "/privado" });
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  test("muestra contenido protegido si autenticado", () => {
    renderWithAuth(<AppMock />, { ctx: { estaAutenticado: true, cargandoAuth: false }, route: "/privado" });
    expect(screen.getByText(/contenido protegido/i)).toBeInTheDocument();
  });
});
