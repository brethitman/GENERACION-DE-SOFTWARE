//autenticacion.routes.ts
import { Router } from "express";

import { iniciarSesion } from "../controllers/autenticacion.controller";
import { registrarUsuario } from "../controllers/registro.controller";
import { validarRegistro } from "../middlewares/validacion.middleware";

const router = Router();

// Login
router.post("/login", iniciarSesion);

// Registro
router.post("/registro", validarRegistro, registrarUsuario);

export default router;
