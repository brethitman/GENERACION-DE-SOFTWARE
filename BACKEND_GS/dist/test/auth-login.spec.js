"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const vitest_1 = require("vitest");
const app_1 = __importDefault(require("../app"));
// 🧪 Mock del repositorio de autenticación
vitest_1.vi.mock("../repositories/autenticacion.repo", () => {
    return {
        verificarUsuario: vitest_1.vi.fn(async (correo, contrasena) => {
            if (correo === "ana@example.com" && contrasena === "123456") {
                // 👇 Devuelve el objeto que tu controlador espera
                return {
                    id_usuario: "1",
                    nombre_completo: "Ana",
                    correo,
                    rol: "estudiante",
                    activo: true,
                };
            }
            // simulamos fallo de credenciales
            return null;
        }),
    };
});
(0, vitest_1.describe)("POST /api/v1/autenticacion/login", () => {
    (0, vitest_1.beforeEach)(() => vitest_1.vi.clearAllMocks());
    (0, vitest_1.it)("400 si faltan campos requeridos", async () => {
        const res = await (0, supertest_1.default)(app_1.default)
            .post("/api/v1/autenticacion/login")
            .send({ correo: "ana@example.com" }); // sin contraseña
        (0, vitest_1.expect)(res.status).toBe(400);
    });
    (0, vitest_1.it)("200 y token con credenciales válidas", async () => {
        const res = await (0, supertest_1.default)(app_1.default)
            .post("/api/v1/autenticacion/login")
            .send({ correo: "ana@example.com", contrasena: "123456" });
        (0, vitest_1.expect)(res.status).toBe(200);
        (0, vitest_1.expect)(res.body?.ok).toBe(true);
        (0, vitest_1.expect)(res.body?.datos?.usuario?.correo).toBe("ana@example.com");
        (0, vitest_1.expect)(res.body?.datos?.token).toBeDefined(); // debería generarse un JWT
    });
    (0, vitest_1.it)("401 con credenciales inválidas", async () => {
        const res = await (0, supertest_1.default)(app_1.default)
            .post("/api/v1/autenticacion/login")
            .send({ correo: "ana@example.com", contrasena: "zzz" });
        (0, vitest_1.expect)(res.status).toBe(401);
    });
    vitest_1.vi.mock('passport-google-oidc', () => ({
        Strategy: vitest_1.vi.fn().mockImplementation((_options, _verify) => {
            return {
                name: 'google',
                authenticate: vitest_1.vi.fn(),
            };
        }),
    }));
});
//# sourceMappingURL=auth-login.spec.js.map