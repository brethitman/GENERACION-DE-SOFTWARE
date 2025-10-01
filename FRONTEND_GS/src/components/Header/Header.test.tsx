// src/components/Header/Header.test.tsx
import { renderWithProviders, screen } from "../../tests/test-utils";
import { describe, it, expect } from "vitest";
import { vi } from "vitest";

vi.mock("../../hooks/useAuth", () => ({
  useAuth: () => ({
    estaAutenticado: true,
    usuario: { nombre: "Demo", correo: "demo@site.com" }
  })
}));

import Header from "./Header";

describe("<Header />", () => {
  it("muestra datos del usuario autenticado", () => {
    renderWithProviders(<Header />);

    // Ajusta estos asserts a lo que muestre tu Header realmente
    expect(screen.getByText(/demo/i)).toBeInTheDocument();
  });
});
