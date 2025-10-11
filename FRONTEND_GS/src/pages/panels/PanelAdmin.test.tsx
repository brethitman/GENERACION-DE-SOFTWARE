import { render, screen} from "@testing-library/react";
import { vi } from "vitest";
import PanelAdmin from "./PanelAdmin"; // Asegúrate de importar el PanelAdmin correctamente

// Mock de la llamada fetch para obtener los usuarios
vi.mock("../services/api", () => ({
  get: vi.fn(),
}));

describe("<PanelAdmin />", () => {
  afterEach(() => {
    vi.clearAllMocks(); // Limpia todos los mocks después de cada test
  });

  test("muestra el mensaje de carga mientras se obtienen los usuarios", async () => {
    // Mock de la llamada al backend para obtener los usuarios
    const mockFetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      datos: [], // Simulamos que no hay usuarios
    });
    global.fetch = mockFetch; // Mockea la función global fetch

    render(<PanelAdmin />);

    // Verifica que se muestra "No hay usuarios" cuando la tabla está vacía
    expect(await screen.findByText("No hay usuarios")).toBeInTheDocument();

    // Asegúrate de que la llamada a fetch se haya hecho
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  test("carga y muestra los usuarios correctamente", async () => {
    const mockFetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      datos: [
        { id: "1", nombre: "Ana", correo: "ana@example.com", rol: "Estudiante" },
        { id: "2", nombre: "Luis", correo: "luis@example.com", rol: "Docente" },
      ], // Simulamos que hay dos usuarios
    });
    global.fetch = mockFetch;

    render(<PanelAdmin />);

    // Verifica que se muestren los usuarios en la tabla
    expect(await screen.findByText("Ana")).toBeInTheDocument();
    expect(screen.getByText("Luis")).toBeInTheDocument();

    // Verifica que los correos estén presentes en la tabla
    expect(screen.getByText("ana@example.com")).toBeInTheDocument();
    expect(screen.getByText("luis@example.com")).toBeInTheDocument();

    // Asegúrate de que la llamada a fetch se haya hecho
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  test("muestra mensaje 'No hay usuarios' si la respuesta es vacía", async () => {
    const mockFetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      datos: [], // Simula una respuesta vacía
    });
    global.fetch = mockFetch;

    render(<PanelAdmin />);

    // Verifica que se muestre el mensaje "No hay usuarios"
    expect(await screen.findByText("No hay usuarios")).toBeInTheDocument();
  });
});
