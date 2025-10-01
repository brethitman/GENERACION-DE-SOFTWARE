// src/pages/Users/Users.test.tsx
import { renderWithProviders, screen } from "../../tests/test-utils";
import { describe, it, expect } from "vitest";
import { vi } from "vitest";
import Users from "./Users";

vi.mock("../../services/api", () => ({
  default: {
    get: vi.fn().mockResolvedValue({
      data: [
        { id: 1, nombre: "Ana", correo: "ana@demo.com", rol: "estudiante" },
        { id: 2, nombre: "Luis", correo: "luis@demo.com", rol: "tutor" }
      ]
    })
  }
}));

describe("<Users />", () => {
  it("carga y muestra usuarios", async () => {
    renderWithProviders(<Users />);

    expect(screen.getByText(/cargando/i)).toBeInTheDocument();

    expect(await screen.findByText("Ana")).toBeInTheDocument();
    expect(screen.getByText("Luis")).toBeInTheDocument();
  });
});
