import { Router } from "express";
import passport from "passport";

import { loginGoogleCallback } from "../controllers/google.controller";

const router = Router();

/**
 * 1️⃣ Inicia el proceso de autenticación con Google
 * Redirige al consentimiento de Google
 */
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

/**
 * 2️⃣ Callback que recibe Google después del login
 * Llama al controlador para generar el JWT y redirigir al frontend
 */
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  loginGoogleCallback
);

export default router;
