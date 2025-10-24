"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const autenticacion_controller_1 = require("../controllers/autenticacion.controller");
const registro_controller_1 = require("../controllers/registro.controller");
const validacion_middleware_1 = require("../middlewares/validacion.middleware");
const router = (0, express_1.Router)();
// Login
router.post("/login", autenticacion_controller_1.iniciarSesion);
// Verificación de código
router.post("/verificar-codigo", autenticacion_controller_1.verificarCodigo);
router.post("/reenviar-codigo", autenticacion_controller_1.reenviarCodigo);
// Registro
router.post("/registro", validacion_middleware_1.validarRegistro, registro_controller_1.registrarUsuario);
exports.default = router;
//# sourceMappingURL=autenticacion.routes.js.map