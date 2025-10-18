import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { buscarPorCorreo, crearUsuario } from "../repositories/usuarios.repo";

export async function registrarUsuario(req: Request, res: Response) {
  try {
    const { nombre, correo, contrasena, rol } = req.body;

    const yaExiste = await buscarPorCorreo(correo);
    if (yaExiste) {
      return res.status(409).json({ ok: false, mensaje: "El correo ya está registrado" });
    }

    const contrasenaHash = await bcrypt.hash(contrasena, 10);
    const usuario = await crearUsuario({ nombre, correo, contrasenaHash, rol });

    // 🔁 Unificamos el nombre de la variable de entorno
    const JWT_SECRET = process.env.JWT_SECRETO;
    if (!JWT_SECRET) {
      return res.status(500).json({ ok: false, mensaje: "Falta JWT_SECRETO en el .env" });
    }

    const token = jwt.sign(
      { sub: usuario.id, rol: usuario.rol, correo: usuario.correo },
      JWT_SECRET,
      { expiresIn: "3d" }
    );

    return res.status(201).json({
      ok: true,
      mensaje: "Registro exitoso",
      datos: { usuario, token },
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ok: false, mensaje: "Error interno del servidor" });
  }
}
