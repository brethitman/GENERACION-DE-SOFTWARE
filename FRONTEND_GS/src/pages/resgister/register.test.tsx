import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, waitFor } from "../../tests/test-utils";
import { renderWithProviders } from "../../tests/test-utils";
import userEvent from "@testing-library/user-event";
import Register from "./register";
import { useAuth } from "../../hooks/useAuth";

// Mock del hook useAuth
vi.mock("../../hooks/useAuth", () => ({
  useAuth: vi.fn(),
}));

const mockRegistrar = vi.fn();
const mockNavigate = vi.fn();

// Mock de react-router-dom
vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

describe("<Register />", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useAuth as any).mockReturnValue({
      registrar: mockRegistrar,
    });
  });

  it("renderiza todos los campos del formulario", () => {
    renderWithProviders(<Register />);

    expect(screen.getByText("Registrarse")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Tu nombre")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("tu@correo.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("••••••••")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("••••••••")).toHaveLength(2); // Contraseña y confirmación
    expect(screen.getByRole("button", { name: "Registrarse" })).toBeInTheDocument();
  });

  it("permite al usuario completar el formulario", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Register />);

    await user.type(screen.getByPlaceholderText("Tu nombre"), "Juan Pérez");
    await user.type(screen.getByPlaceholderText("tu@correo.com"), "juan@example.com");
    await user.type(screen.getAllByPlaceholderText("••••••••")[0], "password123");
    await user.type(screen.getAllByPlaceholderText("••••••••")[1], "password123");

    expect(screen.getByPlaceholderText("Tu nombre")).toHaveValue("Juan Pérez");
    expect(screen.getByPlaceholderText("tu@correo.com")).toHaveValue("juan@example.com");
    expect(screen.getAllByPlaceholderText("••••••••")[0]).toHaveValue("password123");
    expect(screen.getAllByPlaceholderText("••••••••")[1]).toHaveValue("password123");
  });

  it("muestra error cuando las contraseñas no coinciden", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Register />);

    await user.type(screen.getByPlaceholderText("Tu nombre"), "Juan Pérez");
    await user.type(screen.getByPlaceholderText("tu@correo.com"), "juan@example.com");
    await user.type(screen.getAllByPlaceholderText("••••••••")[0], "password123");
    await user.type(screen.getAllByPlaceholderText("••••••••")[1], "differentpassword");
    await user.click(screen.getByRole("button", { name: "Registrarse" }));

    expect(await screen.findByText("Las contraseñas no coinciden")).toBeInTheDocument();
    expect(mockRegistrar).not.toHaveBeenCalled();
  });

  it("llama a registrar cuando el formulario es válido", async () => {
    const user = userEvent.setup();
    mockRegistrar.mockResolvedValueOnce(undefined);

    renderWithProviders(<Register />);

    await user.type(screen.getByPlaceholderText("Tu nombre"), "Juan Pérez");
    await user.type(screen.getByPlaceholderText("tu@correo.com"), "juan@example.com");
    await user.type(screen.getAllByPlaceholderText("••••••••")[0], "password123");
    await user.type(screen.getAllByPlaceholderText("••••••••")[1], "password123");
    await user.click(screen.getByRole("button", { name: "Registrarse" }));

    await waitFor(() => {
      expect(mockRegistrar).toHaveBeenCalledWith({
        nombre: "Juan Pérez",
        correo: "juan@example.com",
        contrasena: "password123",
      });
    });

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("muestra estado de carga durante el registro", async () => {
    const user = userEvent.setup();
    mockRegistrar.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));

    renderWithProviders(<Register />);

    await user.type(screen.getByPlaceholderText("Tu nombre"), "Juan Pérez");
    await user.type(screen.getByPlaceholderText("tu@correo.com"), "juan@example.com");
    await user.type(screen.getAllByPlaceholderText("••••••••")[0], "password123");
    await user.type(screen.getAllByPlaceholderText("••••••••")[1], "password123");
    await user.click(screen.getByRole("button", { name: "Registrarse" }));

    expect(await screen.findByText("Registrando...")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("muestra error cuando el registro falla", async () => {
    const user = userEvent.setup();
    const errorMessage = "El correo ya está registrado";
    mockRegistrar.mockRejectedValueOnce(new Error(errorMessage));

    renderWithProviders(<Register />);

    await user.type(screen.getByPlaceholderText("Tu nombre"), "Juan Pérez");
    await user.type(screen.getByPlaceholderText("tu@correo.com"), "juan@example.com");
    await user.type(screen.getAllByPlaceholderText("••••••••")[0], "password123");
    await user.type(screen.getAllByPlaceholderText("••••••••")[1], "password123");
    await user.click(screen.getByRole("button", { name: "Registrarse" }));

    expect(await screen.findByText(errorMessage)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Registrarse" })).toBeInTheDocument();
  });

  it("muestra error genérico cuando la excepción no es de tipo Error", async () => {
    const user = userEvent.setup();
    mockRegistrar.mockRejectedValueOnce("Error de cadena de texto");

    renderWithProviders(<Register />);

    await user.type(screen.getByPlaceholderText("Tu nombre"), "Juan Pérez");
    await user.type(screen.getByPlaceholderText("tu@correo.com"), "juan@example.com");
    await user.type(screen.getAllByPlaceholderText("••••••••")[0], "password123");
    await user.type(screen.getAllByPlaceholderText("••••••••")[1], "password123");
    await user.click(screen.getByRole("button", { name: "Registrarse" }));

    expect(await screen.findByText("Error al registrarse")).toBeInTheDocument();
  });
});