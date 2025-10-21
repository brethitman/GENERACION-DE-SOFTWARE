// src/pages/Registro/Registro.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import Registro from "./Registro";

// Mocks con Vitest
const mockRegistrarUsuario = vi.fn();
const mockNavigate = vi.fn();

// Mock del servicio de usuarios
vi.mock("../../services/usuarios", () => ({
  registrarUsuario: (args: unknown) => mockRegistrarUsuario(args),
}));

// Mock parcial de react-router-dom para interceptar useNavigate
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Registro", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderWithRouter = () =>
    render(
      <MemoryRouter>
        <Registro />
      </MemoryRouter>
    );

  test("renderiza el formulario de registro correctamente", () => {
    renderWithRouter();

    expect(screen.getByText("Crear cuenta")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Nombre completo")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Correo")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Contraseña")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Confirmar contraseña")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Registrarme" })).toBeInTheDocument();
  });

  test("renderiza el select de roles con opciones correctas", () => {
    renderWithRouter();

    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();
    expect(select).toHaveValue("docente");

    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(3);
    expect(options[0]).toHaveValue("estudiante");
    expect(options[1]).toHaveValue("docente");
    expect(options[2]).toHaveValue("administrador");
  });

  test("link a Iniciar Sesión apunta a /login", () => {
    renderWithRouter();
    const link = screen.getByRole("link", { name: /Inicia sesión/i });
    expect(link).toBeInTheDocument();
    expect(link.getAttribute("href")).toBe("/login");
  });

  test("mostrar y ocultar contraseña funciona para ambos campos", () => {
    renderWithRouter();

    const passwordField = screen.getByPlaceholderText("Contraseña");
    const confirmField = screen.getByPlaceholderText("Confirmar contraseña");

    // Obtener todos los botones (hay 2 toggles + el botón de enviar)
    const allButtons = screen.getAllByRole("button");
    // Filtrar para excluir el botón principal de envío ("Registrarme")
    const toggleButtons = allButtons.filter((b) => b.textContent?.trim() !== "Registrarme");

    // Verificar que inicialmente son de tipo password
    expect(passwordField).toHaveAttribute("type", "password");
    expect(confirmField).toHaveAttribute("type", "password");

    // Hacer clic en el primer toggle (para contraseña)
    fireEvent.click(toggleButtons[0]);
    expect(passwordField).toHaveAttribute("type", "text");
    expect(confirmField).toHaveAttribute("type", "password");

    // Hacer clic en el segundo toggle (para confirmar contraseña)
    fireEvent.click(toggleButtons[1]);
    expect(passwordField).toHaveAttribute("type", "text");
    expect(confirmField).toHaveAttribute("type", "text");
  });

  test("muestra error cuando las contraseñas no coinciden", async () => {
    renderWithRouter();

    // Llenar el formulario
    fireEvent.change(screen.getByPlaceholderText("Nombre completo"), {
      target: { value: "Juan Pérez" },
    });
    fireEvent.change(screen.getByPlaceholderText("Correo"), {
      target: { value: "juan@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Contraseña"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirmar contraseña"), {
      target: { value: "password456" }, // Contraseña diferente
    });

    // Enviar formulario (click al botón)
    fireEvent.click(screen.getByRole("button", { name: /Registrarme/i }));

    await waitFor(() => {
      expect(screen.getByText("Las contraseñas no coinciden")).toBeInTheDocument();
    });

    expect(mockRegistrarUsuario).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test("registra usuario exitosamente y redirige a verificación", async () => {
    const mockResponse = { usuarioId: "123" };
    mockRegistrarUsuario.mockResolvedValue(mockResponse);

    renderWithRouter();

    // Llenar el formulario
    fireEvent.change(screen.getByPlaceholderText("Nombre completo"), {
      target: { value: "Juan Pérez" },
    });
    fireEvent.change(screen.getByPlaceholderText("Correo"), {
      target: { value: "juan@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Contraseña"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirmar contraseña"), {
      target: { value: "password123" }, // Contraseñas coinciden
    });

    // Enviar formulario
    fireEvent.click(screen.getByRole("button", { name: /Registrarme/i }));

    await waitFor(() => {
      expect(mockRegistrarUsuario).toHaveBeenCalledWith({
        nombre: "Juan Pérez",
        correo: "juan@example.com",
        contrasena: "password123",
        rol: "docente",
      });
    });

    expect(mockNavigate).toHaveBeenCalledWith("/verificacion", {
      state: {
        usuarioId: "123",
        correo: "juan@example.com",
        mensaje: "Te hemos enviado un código de verificación a tu correo electrónico.",
      },
    });
  });

  test("muestra error cuando el registro falla", async () => {
    const errorMessage = "Error de conexión";
    mockRegistrarUsuario.mockRejectedValue(new Error(errorMessage));

    renderWithRouter();

    // Llenar el formulario
    fireEvent.change(screen.getByPlaceholderText("Nombre completo"), {
      target: { value: "Juan Pérez" },
    });
    fireEvent.change(screen.getByPlaceholderText("Correo"), {
      target: { value: "juan@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Contraseña"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirmar contraseña"), {
      target: { value: "password123" },
    });

    // Enviar formulario
    fireEvent.click(screen.getByRole("button", { name: /Registrarme/i }));

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test("muestra estado de carga durante el registro", async () => {
    // Crear una promesa que no se resuelve inmediatamente
    let resolvePromise: (value: unknown) => void;
    const promise = new Promise((resolve) => {
      resolvePromise = resolve;
    });
    mockRegistrarUsuario.mockReturnValue(promise);

    renderWithRouter();

    // Llenar el formulario
    fireEvent.change(screen.getByPlaceholderText("Nombre completo"), {
      target: { value: "Juan Pérez" },
    });
    fireEvent.change(screen.getByPlaceholderText("Correo"), {
      target: { value: "juan@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Contraseña"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirmar contraseña"), {
      target: { value: "password123" },
    });

    // Enviar formulario
    fireEvent.click(screen.getByRole("button", { name: /Registrarme/i }));

    // Verificar estado de carga
    expect(screen.getByText("Registrando...")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Registrando..." })).toBeDisabled();

    // Resolver la promesa para limpiar
    resolvePromise!({ usuarioId: "123" });
    await promise;
  });
});
