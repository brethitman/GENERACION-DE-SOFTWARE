// src/hooks/useAuth.test.tsx

import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import type { ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";

// 👇 Importa el proveedor real (AuthProvider) que uses en la app
import AuthProviderCmp from "../context/AuthProvider";
import { useAuth } from "./useAuth";

// Stub de localStorage tipado (sin any)
const localStorageStub = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  key: vi.fn(),
  length: 0,
} as unknown as Storage;

vi.stubGlobal("localStorage", localStorageStub);

// Wrapper: ahora envuelve el provider CON MemoryRouter para que useNavigate funcione
function Wrapper({ children }: { children: ReactNode }) {
  return <MemoryRouter><AuthProviderCmp>{children}</AuthProviderCmp></MemoryRouter>;
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
