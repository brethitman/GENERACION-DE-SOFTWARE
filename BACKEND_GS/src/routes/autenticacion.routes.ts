import { Router } from "express";


import { 
  iniciarSesion, 
  verificarCodigo, 
  reenviarCodigo 
} from "../controllers/autenticacion.controller";
import { registrarUsuario } from "../controllers/registro.controller";
import passport from "../infrastructure/passport-google";
import { validarRegistro } from "../middlewares/validacion.middleware";
import { GoogleUserPayload } from "../types/google-oauth.types";

const router = Router();

/* ============================
   🔹 Login tradicional (de tu amigo)
   ============================ */
router.post("/login", iniciarSesion);

/* ============================
   🔹 Verificación de código (de tu amigo)
   ============================ */
router.post("/verificar-codigo", verificarCodigo);
router.post("/reenviar-codigo", reenviarCodigo);

/* ============================
   🔹 Registro tradicional (de tu amigo)
   ============================ */
router.post("/registro", validarRegistro, registrarUsuario);

/* ============================
   🔹 Login con Google (AGREGADO)
   ============================ */

// Redirección a Google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Callback desde Google
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

    const { usuario, token } = req.user as GoogleUserPayload;

    // Redirige al frontend con token y datos
    const frontendUrl = new URL("http://localhost:5173/auth/google-success");

    frontendUrl.searchParams.set("token", token);
    frontendUrl.searchParams.set(
      "usuario",
      encodeURIComponent(
        JSON.stringify({
          id: String(usuario.id_usuario),
          nombre: usuario.nombre_completo,
          correo: usuario.correo,
          rol: usuario.rol,
        })
      )
    );

    res.redirect(frontendUrl.toString());
  }
);

export default router;
