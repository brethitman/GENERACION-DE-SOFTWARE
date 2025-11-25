// src/pages/Login/Login.test.tsx
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, vi, afterEach } from "vitest";
import { MemoryRouter } from "react-router-dom";

import Login from "./Login";
import type { Credenciales, Ctx, RespuestaLogin } from "../../context/auth-context";
import type { UsuarioPublico } from "../../types/Usuario";

// Usuario fake para tests
const USUARIO_FAKE: UsuarioPublico = {
  id: 1,
  nombre: "Ana",
  correo: "ana@a.com",
  rol: "estudiante",
  activo: true,
  verificado: true,
};

// Mock de useAuth
const iniciarSesionMock = vi.fn<(cred: Credenciales) => Promise<RespuestaLogin>>();

vi.mock("../../context/auth-context", () => ({
  useAuth: (): Ctx => ({
    usuario: USUARIO_FAKE,
    token: "token-fake",
    estaAutenticado: true,
    cargandoAuth: false,
    iniciarSesion: iniciarSesionMock,
    verificarCodigo: vi.fn().mockResolvedValue(undefined),
    reenviarCodigo: vi.fn().mockResolvedValue(undefined),
    cerrarSesion: vi.fn(),
  }),
}));

describe("<Login />", () => {
  afterEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  test("renderiza el título", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", { name: /iniciar sesión/i })
    ).toBeInTheDocument();
  });

  test("permite iniciar sesión con credenciales correctas", async () => {
    iniciarSesionMock.mockResolvedValueOnce({
      ok: true,
      mensaje: "ok",
      datos: {
        usuario: USUARIO_FAKE,
        token: "token-fake",
      },
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const user = userEvent.setup();
    await user.type(screen.getByLabelText(/correo/i), "ana@a.com");
    await user.type(screen.getByLabelText(/contraseña/i), "goodpass");
    await user.click(screen.getByRole("button", { name: /ingresar/i }));

    await waitFor(() => {
      expect(iniciarSesionMock).toHaveBeenCalledWith({
        correo: "ana@a.com",
        contrasena: "goodpass",
      });
    });
  });

  test("muestra error si el backend responde 401", async () => {
    iniciarSesionMock.mockRejectedValueOnce(new Error("No se pudo iniciar sesión"));

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const user = userEvent.setup();
    await user.type(screen.getByLabelText(/correo/i), "ana@a.com");
    await user.type(screen.getByLabelText(/contraseña/i), "badpass");
    await user.click(screen.getByRole("button", { name: /ingresar/i }));

    expect(await screen.findByText(/no se pudo iniciar sesión/i)).toBeInTheDocument();
  });
});
