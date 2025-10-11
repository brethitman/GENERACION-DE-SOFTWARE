import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Registro from "./Registro";

describe("Registro /", () => {

  const renderWithRouter = () =>
    render(
      <MemoryRouter>
        <Registro />
      </MemoryRouter>
    );



  test("renderiza los botones a otros registros", () => {
    renderWithRouter();
    expect(screen.getByText("Registrarse con Google")).toBeInTheDocument();
    expect(screen.getByText("Registrarse con Microsoft")).toBeInTheDocument();
  });

  test("link a Iniciar Sesión apunta a /login", () => {
    renderWithRouter();
    const link = screen.getByRole("link", { name: /Iniciar Sesión/i });
    expect(link).toBeInTheDocument();
    expect(link.getAttribute("href")).toBe("/login");
  });

  test("mostrar y ocultar contraseña funciona", () => {
    renderWithRouter();
    const passwordFields = screen.getAllByPlaceholderText(/contraseña/i);
    const toggleButtons = screen.getAllByRole("button", { hidden: true });
    // estado inicial: tipo = password
    expect(passwordFields[0]).toHaveAttribute("type", "password");
    // clic en el botón de mostrar/ocultar
    fireEvent.click(toggleButtons[0]);
    // ahora debe ser de tipo text
    expect(passwordFields[0]).toHaveAttribute("type", "text");
  });
});
