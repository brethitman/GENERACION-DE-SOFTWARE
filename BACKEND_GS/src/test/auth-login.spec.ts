// src/test/auth-login.spec.ts
import request from "supertest";              // ← Paquetes externos primero
import { describe, it, expect, vi, beforeEach } from "vitest"; // ← Testing framework

import app from "../app";                     // ← Imports internos (proyecto)

// 🧪 Mock del repositorio de autenticación
vi.mock("../repositories/autenticacion.repo", () => {
  return {
    loginUsuario: vi.fn(async (correo: string, contrasena: string) => {
      if (correo === "ana@example.com" && contrasena === "123456") {
        return { token: "FAKE_TOKEN" };
      }
      throw Object.assign(new Error("Credenciales inválidas"), { status: 401 });
    }),
  };
});

describe("POST /api/v1/autenticacion/login", () => {
  beforeEach(() => vi.clearAllMocks());

  it("400 si faltan campos requeridos", async () => {
    const res = await request(app)
      .post("/api/v1/autenticacion/login")
      .send({ correo: "ana@example.com" }); // sin contraseña
    expect(res.status).toBe(400);
  });

  it("200 y token con credenciales válidas", async () => {
    const res = await request(app)
      .post("/api/v1/autenticacion/login")
      .send({ correo: "ana@example.com", contrasena: "123456" });

    expect(res.status).toBe(200);
    expect(res.body?.datos?.token).toBe("FAKE_TOKEN");
  });

  it("401 con credenciales inválidas", async () => {
    const res = await request(app)
      .post("/api/v1/autenticacion/login")
      .send({ correo: "ana@example.com", contrasena: "zzz" });
    expect(res.status).toBe(401);
  });
});
