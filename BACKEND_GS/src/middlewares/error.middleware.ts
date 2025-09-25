import type { Request, Response, NextFunction } from "express";

export function manejadorErrores(err: any, _req: Request, res: Response, _next: NextFunction) {
  console.error(err);
  const estado = err?.status || 500;
  res.status(estado).json({
    ok: false,
    mensaje: err?.message || "Error interno del servidor",
  });
}
