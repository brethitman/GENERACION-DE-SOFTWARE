import dotenv from "dotenv";
import jwt, { type Secret, type SignOptions } from "jsonwebtoken";
import passport from "passport";
import { Strategy as GoogleStrategy, type Profile } from "passport-google-oauth20";

import { ejecutarFilas } from "../infrastructure/db"; // ⚠️ sin .js

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
    },
    async (_accessToken, _refreshToken, profile: Profile, done) => {
      try {
        const correo = profile.emails?.[0]?.value;
        const nombre = profile.displayName;

        if (!correo) {
          return done(new Error("No se obtuvo correo de Google"));
        }

        // Buscar usuario existente
        const usuarios = await ejecutarFilas<{ id_usuario: number }>(
          "SELECT id_usuario FROM usuarios WHERE correo = $1 LIMIT 1",
          [correo]
        );

        let idUsuario: number | undefined = usuarios[0]?.id_usuario;

        // Si no existe, registrar nuevo usuario automáticamente
        if (!idUsuario) {
          const nuevos = await ejecutarFilas<{ id_usuario: number }>(
            `INSERT INTO usuarios (nombre_completo, correo, rol, activo, contrasena_hash)
             VALUES ($1, $2, 'docente', true, '')
             RETURNING id_usuario`,
            [nombre, correo]
          );

          if (!nuevos?.length || !nuevos[0]) {
            return done(new Error("No se pudo registrar el usuario de Google"));
          }

          idUsuario = nuevos[0].id_usuario;
        }

        // ===============================
        // 🔒 Generar JWT correctamente tipado
        // ===============================
        const JWT_SECRETO: Secret = (process.env.JWT_SECRETO ?? "secreto_dev") as Secret;
        const JWT_EXPIRES: NonNullable<SignOptions["expiresIn"]> =
          (process.env.JWT_EXPIRES as NonNullable<SignOptions["expiresIn"]>) ?? "8h";

        const token = jwt.sign(
          { sub: String(idUsuario), rol: "docente", correo },
          JWT_SECRETO,
          { expiresIn: JWT_EXPIRES }
        );

        // Usuario que se devuelve a la app
        const user = {
          id_usuario: idUsuario,
          nombre_completo: nombre,
          correo,
          rol: "docente",
          token,
        };

        return done(null, user);
      } catch (error) {
        return done(error as Error);
      }
    }
  )
);

export default passport;
