import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import UserDropdown from "./UserDropdown";

// Mocks de datos
const mockUser = {
  nombre: "Jhon Duran",
  rol: "Estudiante",
  avatarUrl: "",
};

describe("UserDropdown /", () => {
  test("muestra nombre, rol y avatar", () => {
    render(<UserDropdown {...mockUser} onLogout={vi.fn()} />);

    expect(screen.getByText("Jhon Duran")).toBeInTheDocument();
    expect(screen.getByText("Estudiante")).toBeInTheDocument();
  });

  test("muestra iniciales si no hay avatar", () => {
    render(<UserDropdown nombre="Jhon Duran" rol="User" onLogout={vi.fn()} />);
    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  test("ejecuta onLogout al hacer clic en 'Cerrar sesión'", () => {
    const handleLogout = vi.fn();

    render(<UserDropdown {...mockUser} onLogout={handleLogout} />);

    const button = screen.getByRole("button", { name: /Jhon Duran/i });
    fireEvent.click(button);
    const logoutButton = screen.getByText("Cerrar sesión");
    fireEvent.click(logoutButton);

    expect(handleLogout).toHaveBeenCalledTimes(1);
  });
});