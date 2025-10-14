// src/controllers/autenticacion.controller.ts
import type { Request, Response, NextFunction } from "express";
import jwt, { type Secret, type SignOptions } from "jsonwebtoken";

import { verificarUsuario } from "../repositories/autenticacion.repo";

// Tipamos el secreto como Secret de jsonwebtoken
const JWT_SECRETO: Secret = (process.env.JWT_SECRETO ?? "secreto_dev") as Secret;

// Con exactOptionalPropertyTypes: true, nos aseguramos de que NUNCA sea undefined
type ExpiresIn = NonNullable<SignOptions["expiresIn"]>;
const JWT_EXPIRES: ExpiresIn = ((process.env.JWT_EXPIRES as ExpiresIn) ?? "8h") as ExpiresIn;

/**
 * POST /api/v1/autenticacion/login
 * Body: { correo: string, contrasena: string }
 */
export async function iniciarSesion(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const correo = (req.body?.correo ?? "").trim();
    const contrasena = req.body?.contrasena ?? "";

    if (!correo || !contrasena) {
      return res
        .status(400)
        .json({ ok: false, mensaje: "Faltan el correo o la contraseña." });
    }

    // Debe usar bcrypt.compare dentro del repo y devolver null si no coincide
    const usuario = await verificarUsuario(correo, contrasena);

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
    const token = jwt.sign(payload, JWT_SECRETO, { expiresIn: JWT_EXPIRES });

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
  } catch (err: unknown) {
    return next(err);
  }
}
