import { Request, Response } from "express";
import { listarUsuarios } from "../repositories/usuarios.repo";

export async function obtenerUsuarios(req: Request, res: Response) {
  try {
    const usuarios = await listarUsuarios();
    return res.json({ ok: true, usuarios });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ok: false, mensaje: "Error al obtener usuarios" });
  }
}
