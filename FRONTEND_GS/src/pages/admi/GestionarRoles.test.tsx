import { describe, expect, test, vi, afterEach, beforeEach} from "vitest";
import { screen, render, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import type { Mock } from "vitest";

import RolesUsuario from "./GestionarRoles";

// Mock para fetch
const mockUsuarios = [
  {
    id: 1,
    nombre: "Juan Pérez",
    correo: "juan@correo.com",
    rol: "estudiante",
    activo: true,
  },
  {
    id: 2,
    nombre: "María López",
    correo: "maria@correo.com",
    rol: "Docente Editor",
    activo: false,
  },
];

describe("<GestionarRoles />", () => {
  beforeEach(() => {
    global.fetch = vi.fn().mockImplementation((_, options) => {
      if (options?.method === "PUT") {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ mensaje: "Rol actualizado" }),
        });
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ usuarios: mockUsuarios }),
      });
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("muestra mensaje de carga inicialmente y luego renderiza la tabla", async () => {
    render(
      <MemoryRouter>
        <RolesUsuario />
      </MemoryRouter>
    );

    expect(screen.getByText(/cargando usuarios/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Juan Pérez")).toBeInTheDocument();
      expect(screen.getByText("María López")).toBeInTheDocument();
    });
  });

  test("permite cambiar rol de un usuario (editor)", async () => {
    render(
      <MemoryRouter>
        <RolesUsuario />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Juan Pérez")).toBeInTheDocument();
    });

    const botonEditor = screen.getAllByRole("button", {
      name: /asignar rol docente editor/i,
    })[0];

    fireEvent.click(botonEditor);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:3000/api/v1/usuarios/1",
        expect.objectContaining({
          method: "PUT",
          body: JSON.stringify({ rol: "editor" }),
        })
      );
    });
  });

  test("muestra mensaje si no hay usuarios", async () => {
    (global.fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ usuarios: [] }),
    });

    render(
      <MemoryRouter>
        <RolesUsuario />
      </MemoryRouter>
    );

    expect(screen.getByText(/cargando usuarios/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(
        screen.getByText(/no existen usuarios registrados/i)
      ).toBeInTheDocument();
    });
  });

  test("maneja error si falla el fetch inicial", async () => {
    (global.fetch as Mock).mockRejectedValueOnce(new Error("Fallo de red"));

    render(
      <MemoryRouter>
        <RolesUsuario />
      </MemoryRouter>
    );

    expect(screen.getByText(/cargando usuarios/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/no existen usuarios registrados/i)).toBeInTheDocument();
    });
  });

  test("navega al panel administrativo al hacer click en el botón", async () => {
    render(
      <MemoryRouter initialEntries={["/usuarios"]}>
        <RolesUsuario />
      </MemoryRouter>
    );

    const boton = screen.getByRole("button", {
      name: /ir a panel administrativo/i,
    });

    expect(boton).toBeInTheDocument();
    fireEvent.click(boton);

  });
});
