// src/pages/Home/home.test.tsx

import { screen } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";

import { renderWithAuth } from "../../test-utils/renderWithAuth";
import Home from "./Home";

describe("<Home />", () => {
  afterEach(() => {
    // nada especial aquí, pero lo mantenemos por consistencia
  });

  test("muestra mensaje para no autenticados", () => {
    renderWithAuth(<Home />, {
      ctx: {
        cargandoAuth: false,
        estaAutenticado: false,
        usuario: null,
      },
    });

    expect(screen.getByRole("heading", { name: /inicio/i })).toBeInTheDocument();
    expect(
      screen.getByText(/inicia sesión para acceder a tu cuenta/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /bienvenido a la plataforma/i })
    ).toBeInTheDocument();
    expect(screen.queryByText(/rol:/i)).not.toBeInTheDocument();
  });

  test("muestra perfil y tarjetas cuando está autenticado", () => {
    renderWithAuth(<Home />, {
      ctx: {
        cargandoAuth: false,
        estaAutenticado: true,
        usuario: {
          id: 1,
          nombre: "María Pérez",
          correo: "maria@correo.com",
          rol: "estudiante",
          activo: true,
          verificado: true
        },
      },
    });

    expect(
      screen.getByText(/bienvenido a tu panel principal/i)
    ).toBeInTheDocument();
    expect(screen.getByText("María Pérez")).toBeInTheDocument();
    expect(screen.getByText(/rol:\s*estudiante/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /resumen general/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /actividades/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /noticias/i })
    ).toBeInTheDocument();
  });
});
