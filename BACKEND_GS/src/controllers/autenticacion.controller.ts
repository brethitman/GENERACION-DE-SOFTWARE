import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { verificarUsuario } from "../repositories/autenticacion.repo";

const JWT_SECRETO = process.env.JWT_SECRETO || "secreto_dev";

export async function iniciarSesion(req: Request, res: Response, next: NextFunction) {
  try {
    const { correo, contrasena } = req.body as { correo?: string; contrasena?: string };

    if (!correo || !contrasena) {
      return res.status(400).json({ ok: false, mensaje: "Faltan el correo o la contraseña." });
    }

    const usuario = await verificarUsuario(correo, contrasena);
    if (!usuario) {
      return res.status(401).json({ ok: false, mensaje: "Credenciales inválidas." });
    }
    if (!usuario.activo) {
      return res.status(403).json({ ok: false, mensaje: "Usuario inactivo." });
    }

    const token = jwt.sign(
      { sub: usuario.id_usuario, rol: usuario.rol, correo: usuario.correo },
      JWT_SECRETO,
      { expiresIn: "8h" }
    );

    return res.json({
      ok: true,
      mensaje: "Inicio de sesión exitoso",
      datos: {
        usuario: {
          id: usuario.id_usuario,
          nombre: usuario.nombre_completo,
          correo: usuario.correo,
          rol: usuario.rol,
        },
        token,
      },
    });
  } catch (err) {
    next(err);
  }
}
