import { Router } from "express";
import passport from "passport";

import { iniciarSesion } from "../controllers/autenticacion.controller";
import { registrarUsuario } from "../controllers/registro.controller";
import { validarRegistro } from "../middlewares/validacion.middleware";
import { GoogleUserPayload } from "../types/google-oauth.types"; // ✅ Importa el tipo

const router = Router();

// Login tradicional
router.post("/login", iniciarSesion);

// Registro tradicional
router.post("/registro", validarRegistro, registrarUsuario);

// Login con Google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback de Google
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    if (!req.user) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error al autenticar con Google",
      });
    }

    const { usuario, token } = req.user as GoogleUserPayload; // ✅ Ahora sí reconoce el tipo

    // Respuesta JSON
    res.status(200).json({
      ok: true,
      mensaje: "Inicio de sesión con Google exitoso",
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
);

export default router;
