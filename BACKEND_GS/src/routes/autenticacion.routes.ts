import { Router } from "express";

import { 
  iniciarSesion, 
  verificarCodigo, 
  reenviarCodigo 
} from "../controllers/autenticacion.controller";
import { registrarUsuario } from "../controllers/registro.controller";
import { validarRegistro } from "../middlewares/validacion.middleware";

const router = Router();

// Login
router.post("/login", iniciarSesion);

// Verificación de código
router.post("/verificar-codigo", verificarCodigo);
router.post("/reenviar-codigo", reenviarCodigo);

// Registro
router.post("/registro", validarRegistro, registrarUsuario);

export default router;