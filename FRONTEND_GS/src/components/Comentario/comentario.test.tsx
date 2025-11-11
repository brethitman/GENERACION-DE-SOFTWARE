import { render, screen, fireEvent } from "@testing-library/react";
import ComentariosPanel from "./comentario";
import { useAuth } from "../../hooks/useAuth";

// ✅ Mock del hook useAuth
jest.mock("../../hooks/useAuth");

describe("ComentariosPanel", () => {
  const mockUsuario = { nombre: "TestUser", rol: "usuario" };

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      usuario: mockUsuario,
      token: "fake-token",
      estaAutenticado: true,
      cargandoAuth: false,
      iniciarSesion: jest.fn(),
      verificarCodigo: jest.fn(),
      reenviarCodigo: jest.fn(),
      cerrarSesion: jest.fn(),
    });
  });

  test("renderiza el componente y muestra mensaje cuando no hay comentarios", () => {
    render(<ComentariosPanel />);

    expect(screen.getByText("Comentarios")).toBeInTheDocument();
    expect(screen.getByText("No hay comentarios aún. ¡Sé el primero!")).toBeInTheDocument();
  });

  test("permite agregar un comentario principal y mostrarlo", () => {
    render(<ComentariosPanel />);

    const textarea = screen.getByPlaceholderText("Escribe un comentario...");
    const enviarBtn = screen.getByText("Enviar");

    // Escribir un comentario
    fireEvent.change(textarea, { target: { value: "Hola, este es un comentario" } });
    fireEvent.click(enviarBtn);

    // Verificar que el comentario se muestre
    expect(screen.getByText("TestUser")).toBeInTheDocument();
    expect(screen.getByText("Hola, este es un comentario")).toBeInTheDocument();
  });

  test("permite agregar una respuesta a un comentario existente", () => {
    render(<ComentariosPanel />);

    const textarea = screen.getByPlaceholderText("Escribe un comentario...");
    const enviarBtn = screen.getByText("Enviar");

    // Agregar comentario principal
    fireEvent.change(textarea, { target: { value: "Comentario principal" } });
    fireEvent.click(enviarBtn);

    // Agregar respuesta
    fireEvent.change(screen.getByPlaceholderText("Agrega una respuesta..."), {
      target: { value: "Esta es una respuesta" },
    });
    fireEvent.click(enviarBtn);

    // Verificar respuesta
    expect(screen.getByText("Esta es una respuesta")).toBeInTheDocument();
  });
});
