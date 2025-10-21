import { fireEvent, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";

import { renderWithAuth } from "../../test-utils/renderWithAuth";
import type { Credenciales, RespuestaLogin } from "../../context/auth-context";
import type { UsuarioPublico } from "../../types/Usuario";
import Login from "./Login";

const USUARIO_FAKE: UsuarioPublico = {
  id: 1,
  nombre: "Ana",
  correo: "ana@a.com",
  rol: "estudiante",
  activo: true,
  verificado: true,
};

describe("<Login />", () => {
  afterEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  test("renderiza el título", () => {
    renderWithAuth(<Login />, { ctx: { cargandoAuth: false } });
    expect(screen.getByRole("heading", { name: /iniciar sesión/i })).toBeInTheDocument();
  });

  test("muestra campos y permite iniciar sesión", async () => {
    // ✅ CORREGIDO: Mock que retorna RespuestaLogin
    const iniciarSesionMock = vi
      .fn<(cred: Credenciales) => Promise<RespuestaLogin>>()
      .mockResolvedValue({
        ok: true,
        mensaje: "Login exitoso",
        datos: {
          usuario: USUARIO_FAKE,
          token: "fake-token"
        }
      });

    renderWithAuth(<Login />, {
      ctx: {
        iniciarSesion: iniciarSesionMock,
        cargandoAuth: false,
      },
      route: "/login",
    });

    fireEvent.change(screen.getByLabelText(/correo/i), { target: { value: "a@a.com" } });
    fireEvent.change(screen.getByLabelText(/contraseña/i), { target: { value: "goodpass" } });

    fireEvent.submit(screen.getByRole("button", { name: /ingresar/i }));

    await waitFor(() => {
      expect(iniciarSesionMock).toHaveBeenCalledWith({
        correo: "a@a.com",
        contrasena: "goodpass",
      });
    });
  });

  test("muestra error si el backend responde 401", async () => {
    // ✅ CORREGIDO: Mock que rechaza con Error
    const iniciarSesionMock = vi
      .fn<(cred: Credenciales) => Promise<RespuestaLogin>>()
      .mockRejectedValue(new Error("No se pudo iniciar sesión"));

    renderWithAuth(<Login />, {
      ctx: {
        iniciarSesion: iniciarSesionMock,
        cargandoAuth: false,
      },
      route: "/login",
    });

    fireEvent.change(screen.getByLabelText(/correo/i), { target: { value: "a@a.com" } });
    fireEvent.change(screen.getByLabelText(/contraseña/i), { target: { value: "bad" } });

    fireEvent.submit(screen.getByRole("button", { name: /ingresar/i }));

    expect(
      await screen.findByText(/no se pudo iniciar sesión/i)
    ).toBeInTheDocument();
  });
});