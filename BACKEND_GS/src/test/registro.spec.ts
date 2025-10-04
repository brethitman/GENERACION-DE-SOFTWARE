// src/test/registro.spec.ts

// Paquetes externos
import request from "supertest";
import { describe, it, expect, vi, beforeEach } from "vitest";

// Paquetes internos
import app from "../app";

// 🧪 Mock del repositorio de usuarios
// Declaramos el array fuera para que persista entre llamadas
interface UsuarioMock {
  id: string;
  nombre: string;
  correo: string;
  rol: string;
  contrasena_hash: string;
}
const usuarios: UsuarioMock[] = [];

vi.mock("../repositories/usuarios.repo", () => {
  return {
    buscarPorCorreo: vi.fn(async (correo: string) => {
      return usuarios.find((u) => u.correo === correo) || null;
    }),

    crearUsuario: vi.fn(
      async ({
        nombre,
        correo,
        contrasenaHash,
        rol,
      }: {
        nombre: string;
        correo: string;
        contrasenaHash: string;
        rol: string;
      }) => {
        const nuevo: UsuarioMock = {
          id: String(Date.now()),
          nombre,
          correo,
          rol,
          contrasena_hash: contrasenaHash,
        };
        usuarios.push(nuevo);
        return nuevo;
      }
    ),
  };
});

describe("🧪 Test de registro de usuario", () => {
  beforeEach(() => {
    // Limpiamos array antes de cada test
    usuarios.length = 0;
    vi.clearAllMocks();
  });

  it("✅ debería registrar un usuario nuevo", async () => {
    const nuevoUsuario = {
      nombre: "Carlos López",
      correo: `carlos${Date.now()}@correo.com`, // correo único
      contrasena: "ClaveSegura123#",
      rol: "estudiante",
    };

    const res = await request(app)
      .post("/api/v1/autenticacion/registro")
      .send(nuevoUsuario)
      .expect(201);

    expect(res.body.ok).toBe(true);
    expect(res.body.mensaje).toMatch(/Registro exitoso/);
    expect(res.body.datos).toHaveProperty("usuario");
    expect(res.body.datos.usuario).toHaveProperty("id");
    expect(res.body.datos.usuario.correo).toBe(nuevoUsuario.correo);
    expect(res.body.datos).toHaveProperty("token");
  });

  it("❌ debería rechazar registro si falta algún campo", async () => {
    const res = await request(app)
      .post("/api/v1/autenticacion/registro")
      .send({
        correo: "falta@correo.com",
        contrasena: "123456",
      })
      .expect(400);

    expect(res.body.ok).toBe(false);
  });

  it("❌ debería rechazar si el correo ya está registrado", async () => {
    const usuario = {
      nombre: "Duplicado",
      correo: `duplicado${Date.now()}@correo.com`,
      contrasena: "Passw0rd#2025",
      rol: "docente",
    };

    // Primer intento debería pasar
    const res1 = await request(app)
      .post("/api/v1/autenticacion/registro")
      .send(usuario)
      .expect(201);

    expect(res1.body.ok).toBe(true);

    // Segundo intento debería fallar (correo duplicado)
    const res2 = await request(app)
      .post("/api/v1/autenticacion/registro")
      .send(usuario)
      .expect(409);

    expect(res2.body.ok).toBe(false);
    expect(res2.body.mensaje).toMatch(/ya está registrado/);
  });
});
