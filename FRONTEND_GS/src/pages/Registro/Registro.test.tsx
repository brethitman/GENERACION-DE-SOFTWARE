import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Registro from "./Registro";

// Mock de las dependencias
jest.mock("../../services/usuarios", () => ({
  registrarUsuario: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("Registro", () => {
  const mockRegistrarUsuario = require("../../services/usuarios").registrarUsuario;
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    require("react-router-dom").useNavigate.mockReturnValue(mockNavigate);
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
    
    // Botones para mostrar/ocultar (pueden estar ocultos para tests de accesibilidad)
    const toggleButtons = screen.getAllByRole("button", { name: "" });
    
    // Verificar que inicialmente son de tipo password
    expect(passwordField).toHaveAttribute("type", "password");
    expect(confirmField).toHaveAttribute("type", "password");
    
    // Hacer clic en el primer botón (para contraseña)
    fireEvent.click(toggleButtons[0]);
    expect(passwordField).toHaveAttribute("type", "text");
    expect(confirmField).toHaveAttribute("type", "password");
    
    // Hacer clic en el segundo botón (para confirmar contraseña)
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
    
    // Enviar formulario
    fireEvent.submit(screen.getByRole("form"));
    
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
    fireEvent.submit(screen.getByRole("form"));
    
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
        mensaje: "Te hemos enviado un código de verificación a tu correo electrónico."
      }
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
    fireEvent.submit(screen.getByRole("form"));
    
    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
    
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test("muestra estado de carga durante el registro", async () => {
    mockRegistrarUsuario.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));
    
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
    fireEvent.submit(screen.getByRole("form"));
    
    expect(screen.getByText("Registrando...")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Registrando..." })).toBeDisabled();
  });
});