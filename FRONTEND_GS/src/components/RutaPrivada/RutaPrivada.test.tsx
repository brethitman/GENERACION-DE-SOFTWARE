// src/components/RutaPrivada/RutaPrivada.test.tsx
import { renderWithProviders, screen } from "../../tests/test-utils";
import { describe, it, expect } from "vitest";
import { vi } from "vitest";
import type { Mock } from "vitest";

// 1) Mock del hook ANTES de importar el componente
vi.mock("../../hooks/useAuth", () => ({
  useAuth: vi.fn()
}));

// 2) Ahora importamos el hook mockeado y luego el componente
import { useAuth } from "../../hooks/useAuth";
import RutaPrivada from "./RutaPrivada";

describe("<RutaPrivada />", () => {
  it("si NO está autenticado, redirige al /login (no muestra el contenido)", () => {
    (useAuth as unknown as Mock).mockReturnValue({ estaAutenticado: false });

    renderWithProviders(
      <RutaPrivada>
        <div>Secreto</div>
      </RutaPrivada>
    );

    expect(screen.queryByText(/Secreto/)).not.toBeInTheDocument();
  });

  it("si está autenticado, muestra el contenido protegido", () => {
    (useAuth as unknown as Mock).mockReturnValue({ estaAutenticado: true });

    renderWithProviders(
      <RutaPrivada>
        <div>Secreto</div>
      </RutaPrivada>
    );

    expect(screen.getByText(/Secreto/)).toBeInTheDocument();
  });
});
