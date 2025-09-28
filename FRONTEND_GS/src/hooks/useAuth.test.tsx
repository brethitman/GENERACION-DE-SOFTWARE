// src/hooks/useAuth.test.tsx

// EXTERNOS
import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { vi } from "vitest";
import type { ReactNode } from "react";

// INTERNOS
// 👇 Alias para evitar choque entre nombre de tipo y valor (AuthProvider)
import AuthProviderCmp from "../context/AuthProvider"; // ajusta la ruta si tu archivo se llama distinto
import { useAuth } from "./useAuth";

// Stub de localStorage tipado (sin any)
const localStorageStub = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  key: vi.fn(),
  length: 0
} as unknown as Storage;

vi.stubGlobal("localStorage", localStorageStub);

// Wrapper sin usar React.FC para evitar interpretaciones de tipo
function Wrapper({ children }: { children: ReactNode }) {
  return <AuthProviderCmp>{children}</AuthProviderCmp>;
}

describe("useAuth", () => {
  it("expone iniciarSesion y cerrarSesion", () => {
    const { result } = renderHook(() => useAuth(), { wrapper: Wrapper });

    expect(typeof result.current.iniciarSesion).toBe("function");
    expect(typeof result.current.cerrarSesion).toBe("function");
  });

  it("cierra sesión limpiando localStorage", () => {
    const { result } = renderHook(() => useAuth(), { wrapper: Wrapper });

    act(() => result.current.cerrarSesion());

    expect(localStorage.removeItem).toHaveBeenCalledWith("token");
    expect(localStorage.removeItem).toHaveBeenCalledWith("usuario");
  });
});
