// src/routes/google.routes.ts
/*
import { Router, Request, Response, NextFunction } from "express";

import passport from "../config/passport.google";
import { callbackGoogle } from "../controllers/google.controller";

// Extendemos la interfaz de Request para incluir 'user'
interface GoogleUser {
  googleId: string;
  email: string;
  name: string;
  photo?: string;
}
interface GoogleRequest extends Request {
  user?: GoogleUser;
}

const router = Router();

// Inicio del flujo de login
router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "openid",
      "email",
      "profile",
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ],
  })
);

// Callback que recibe Google tras autenticación
router.get(
  "/google/callback",
  (req: Request, res: Response, next: NextFunction): void => {
    passport.authenticate(
      "google",
      { session: false },
      (err: Error | null, user: GoogleUser | false | undefined): void => {
        if (err) {
          console.error("[GoogleAuth Error]", err);
          res.status(500).send("Error en autenticación con Google");
          return;
        }

        if (!user) {
          res.status(401).send("Autenticación de Google fallida");
          return;
        }

        // Asignamos el usuario al request (sin usar any)
        (req as GoogleRequest).user = user;
        callbackGoogle(req as GoogleRequest, res);
      }
    )(req, res, next);
  }
);

export default router;
*/