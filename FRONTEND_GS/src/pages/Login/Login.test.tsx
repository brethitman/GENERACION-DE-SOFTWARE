// src/pages/Login/Login.test.tsx
import { screen } from "../../tests/test-utils";
import { renderWithProviders } from "../../tests/test-utils";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { vi } from "vitest";
import type { Mock } from "vitest";
import Login from "./Login";
import api from "../../services/api";

vi.mock("../../services/api", () => {
  return {
    default: {
      post: vi.fn().mockResolvedValue({
        data: {
          datos: {
            token: "TOKEN_FAKE",
            usuario: { id: 1, nombre: "Usuario Demo", correo: "demo@site.com" }
          }
        }
      })
    }
  };
});

describe("<Login />", () => {
  it("muestra campos y permite iniciar sesión", async () => {
    renderWithProviders(<Login />);

    // Usamos placeholders en lugar de labelText para evitar htmlFor/id
    const email = screen.getByPlaceholderText(/tu@correo\.com/i);
    const pass = screen.getByPlaceholderText(/•+/i);
    const submit = screen.getByRole("button", { name: /ingresar|iniciar sesión|login/i });

    await userEvent.clear(email);
    await userEvent.type(email, "demo@site.com");
    await userEvent.clear(pass);
    await userEvent.type(pass, "secret123");
    await userEvent.click(submit);

    // Algún feedback de éxito que muestre tu UI (ajusta el texto si difiere)
    // Si tu UI no muestra texto, al menos verificamos side effects:
    expect(localStorage.getItem("token")).toBe("TOKEN_FAKE");
  });

  it("muestra error si el backend responde 401", async () => {
    (api.post as Mock).mockRejectedValueOnce({ response: { status: 401 } });

    renderWithProviders(<Login />);

    const email = screen.getByPlaceholderText(/tu@correo\.com/i);
    const pass = screen.getByPlaceholderText(/•+/i);
    const submit = screen.getByRole("button", { name: /ingresar|iniciar sesión|login/i });

    await userEvent.clear(email);
    await userEvent.type(email, "a@a.com");
    await userEvent.clear(pass);
    await userEvent.type(pass, "bad");
    await userEvent.click(submit);

    // Ajusta el texto de error al de tu componente
    expect(await screen.findByText(/credenciales inválidas|error|401/i)).toBeInTheDocument();
  });
});
