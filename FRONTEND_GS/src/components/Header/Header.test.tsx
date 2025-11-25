import { screen } from "@testing-library/react";
import { describe, it } from "vitest";

import Header from "./Header";
import { renderWithProviders } from "../../test-utils/renderWithProviders";

describe("<Header />", () => {
  it("muestra datos del usuario autenticado", () => {
    renderWithProviders(<Header />, {
      authValue: {
        estaAutenticado: true,
        usuario: {
          id: 1,
          nombre: "Demo",
          correo: "demo@site.com",
          rol: "estudiante",
          activo: true,
          verificado: true
        },
      },
    });


    expect(screen.getByText(/demo/i)).toBeInTheDocument();
    expect(screen.queryByText(/iniciar sesión/i)).not.toBeInTheDocument();
  });

  it("muestra enlace de login cuando no hay usuario", () => {
    renderWithProviders(<Header />, {
      authValue: { estaAutenticado: false, usuario: null },
    });

    expect(screen.getByText(/iniciar sesión/i)).toBeInTheDocument();
  });
});
