/*import type { Request, Response } from "express";
import jwt, { type Secret, type SignOptions } from "jsonwebtoken";

import { buscarPorCorreo, crearUsuario } from "../repositories/usuarios.repo";

interface Usuario {
  id: string | number;
  nombre: string;
  correo: string;
  rol: string;
}

function firmarJWT(payload: { sub: string; rol: string; correo: string }): string {
  const secret: Secret = process.env.JWT_SECRETO as string;
  const exp = process.env.JWT_EXPIRES;
  const expiresIn: SignOptions["expiresIn"] =
    exp && !Number.isNaN(Number(exp)) ? Number(exp) : 10800;
  return jwt.sign(payload, secret, { expiresIn });
}

export async function callbackGoogle(req: Request, res: Response): Promise<void> {
  try {
    const user = req.user as { email?: string; name?: string } | undefined;
    if (!user?.email) {
      res.redirect("/login");
      return;
    }

    const email = user.email;
    const name = user.name ?? "";

    let usuario = (await buscarPorCorreo(email)) as Usuario | null;
    if (!usuario) {
      usuario = (await crearUsuario({
        nombre: name,
        correo: email,
        contrasenaHash: "",   // marcador para cuentas Google
        rol: "estudiante",
      })) as Usuario;
    }

    const token = firmarJWT({
      sub: String(usuario.id),
      rol: usuario.rol,
      correo: usuario.correo,
    });

    // Redirige a tu front con token por query
    const urlFront = new URL("http://localhost:5173/");
    urlFront.searchParams.set("token", token);
    urlFront.searchParams.set("nombre", usuario.nombre);
    urlFront.searchParams.set("correo", usuario.correo);

    res.redirect(urlFront.toString());
  } catch (err) {
     
    console.error("[callbackGoogle] Error:", err);
    res.redirect("/login");
  }
}
*/


// src/controllers/google.controller.ts
/*
import { Request, Response } from "express";

import { buscarPorCorreo, crearUsuario } from "../services/usuario.service";
import { firmarJWT } from "../utils/jwt";

export async function callbackGoogle(req: Request, res: Response) {
  try {
    const { email, name, photo } = req.user as {
      email: string; name: string; photo?: string;
    };

    let usuario = await buscarPorCorreo(email);
    if (!usuario) {
      usuario = await crearUsuario({
        nombre: name,
        correo: email,
        contrasenaHash: "",
        rol: "estudiante",
      });
    }

    const token = firmarJWT({
      sub: String(usuario.id),
      rol: usuario.rol,
      correo: usuario.correo,
    });

    return res.json({
      ok: true,
      provider: "google",
      profile: { email, name, photo },
      usuario,
      token,
    });
  } catch (err) {
    console.error("[callbackGoogle Error]", err);
    res.status(500).json({ ok: false, mensaje: "Error en callback Google" });
  }
}
*/