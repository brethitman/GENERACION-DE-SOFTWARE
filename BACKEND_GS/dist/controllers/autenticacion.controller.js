"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.iniciarSesion = iniciarSesion;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const autenticacion_repo_1 = require("../repositories/autenticacion.repo");
// Tipamos el secreto como Secret de jsonwebtoken
const JWT_SECRETO = (process.env.JWT_SECRETO ?? "secreto_dev");
const JWT_EXPIRES = (process.env.JWT_EXPIRES ?? "8h");
/**
 * POST /api/v1/autenticacion/login
 * Body: { correo: string, contrasena: string }
 */
async function iniciarSesion(req, res, next) {
    try {
        const correo = (req.body?.correo ?? "").trim();
        const contrasena = req.body?.contrasena ?? "";
        if (!correo || !contrasena) {
            return res
                .status(400)
                .json({ ok: false, mensaje: "Faltan el correo o la contraseña." });
        }
        // Debe usar bcrypt.compare dentro del repo y devolver null si no coincide
        const usuario = await (0, autenticacion_repo_1.verificarUsuario)(correo, contrasena);
        if (!usuario) {
            return res
                .status(401)
                .json({ ok: false, mensaje: "Credenciales inválidas." });
        }
        if (usuario.activo === false) {
            return res.status(403).json({ ok: false, mensaje: "Usuario inactivo." });
        }
        const payload = {
            sub: String(usuario.id_usuario),
            rol: usuario.rol,
            correo: usuario.correo,
        };
        // Usamos default import para evitar conflictos de overloads
        const token = jsonwebtoken_1.default.sign(payload, JWT_SECRETO, { expiresIn: JWT_EXPIRES });
        return res.status(200).json({
            ok: true,
            mensaje: "Inicio de sesión exitoso",
            datos: {
                usuario: {
                    id: String(usuario.id_usuario),
                    nombre: usuario.nombre_completo,
                    correo: usuario.correo,
                    rol: usuario.rol,
                },
                token,
            },
        });
    }
    catch (err) {
        return next(err);
    }
}
//# sourceMappingURL=autenticacion.controller.js.map