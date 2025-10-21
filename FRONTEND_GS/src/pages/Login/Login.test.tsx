// src/pages/Login/Login.test.tsx
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, test, vi } from "vitest";

import { renderWithAuth } from "../../test-utils/renderWithAuth";
import type { Credenciales } from "../../context/auth-context";
import type { UsuarioPublico } from "../../types/Usuario";
import Login from "./Login";

// Mock del hook useAuth para tener control total en cada test
vi.mock("../../hooks/useAuth", () => {
  return {
    useAuth: vi.fn(),
  };
});
import { useAuth as useAuthMocked } from "../../hooks/useAuth";

const USUARIO_FAKE: UsuarioPublico = {
  id: 1,
  nombre: "Ana",
  correo: "ana@a.com",
  rol: "estudiante",
  activo: false,
  verificado: false
};

describe("<Login />", () => {
  afterEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  test("renderiza el título", () => {
    // Proveer un useAuth por defecto (solo para que el componente no falle)
    (useAuthMocked as unknown as jest.Mock).mockReturnValue({
      iniciarSesion: vi.fn(),
      cargandoAuth: false,
    });

    renderWithAuth(<Login />, { ctx: { cargandoAuth: false } });
    expect(screen.getByRole("heading", { name: /iniciar sesión/i })).toBeInTheDocument();
  });

  test("muestra campos y permite iniciar sesión", async () => {
    // Mock: iniciarSesion recibe credenciales y devuelve { datos: { usuario } }
    const iniciarSesionMock = vi
      .fn<(cred: Credenciales) => Promise<{ datos: { usuario: UsuarioPublico } }>>()
      .mockResolvedValue({ datos: { usuario: USUARIO_FAKE } });

    (useAuthMocked as unknown as jest.Mock).mockReturnValue({
      iniciarSesion: iniciarSesionMock,
      cargandoAuth: false,
    });

    renderWithAuth(<Login />, {
      ctx: {
        cargandoAuth: false,
      },
      route: "/login",
    });

    const user = userEvent.setup();
    await user.type(screen.getByLabelText(/correo/i), "a@a.com");
    await user.type(screen.getByLabelText(/contraseña/i), "goodpass");
    await user.click(screen.getByRole("button", { name: /ingresar/i }));

    await waitFor(() => {
      expect(iniciarSesionMock).toHaveBeenCalledWith({
        correo: "a@a.com",
        contrasena: "goodpass",
      });
    });
  });

  test("muestra error si el backend responde 401", async () => {
    // Mock: iniciarSesion rechaza con Error
    const iniciarSesionMock = vi
      .fn<(cred: Credenciales) => Promise<{ datos?: { usuario?: UsuarioPublico } }>>()
      .mockRejectedValue(new Error("No se pudo iniciar sesión"));

    (useAuthMocked as unknown as jest.Mock).mockReturnValue({
      iniciarSesion: iniciarSesionMock,
      cargandoAuth: false,
    });

    renderWithAuth(<Login />, {
      ctx: {
        cargandoAuth: false,
      },
      route: "/login",
    });

    const user = userEvent.setup();
    await user.type(screen.getByLabelText(/correo/i), "a@a.com");
    await user.type(screen.getByLabelText(/contraseña/i), "bad");
    await user.click(screen.getByRole("button", { name: /ingresar/i }));

    expect(
      await screen.findByText(/no se pudo iniciar sesión/i)
    ).toBeInTheDocument();
  });
});
