"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registrarUsuario = registrarUsuario;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const usuarios_repo_1 = require("../repositories/usuarios.repo");
async function registrarUsuario(req, res) {
    try {
        const { nombre, correo, contrasena, rol } = req.body;
        const yaExiste = await (0, usuarios_repo_1.buscarPorCorreo)(correo);
        if (yaExiste) {
            return res.status(409).json({ ok: false, mensaje: "El correo ya está registrado" });
        }
        const contrasenaHash = await bcryptjs_1.default.hash(contrasena, 10);
        const usuario = await (0, usuarios_repo_1.crearUsuario)({ nombre, correo, contrasenaHash, rol });
        // 🔁 Unificamos el nombre de la variable de entorno
        const JWT_SECRET = process.env.JWT_SECRETO;
        if (!JWT_SECRET) {
            return res.status(500).json({ ok: false, mensaje: "Falta JWT_SECRETO en el .env" });
        }
        const token = jsonwebtoken_1.default.sign({ sub: usuario.id, rol: usuario.rol, correo: usuario.correo }, JWT_SECRET, { expiresIn: "3d" });
        return res.status(201).json({
            ok: true,
            mensaje: "Registro exitoso",
            datos: { usuario, token },
        });
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ ok: false, mensaje: "Error interno del servidor" });
    }
}
//# sourceMappingURL=registro.controller.js.map