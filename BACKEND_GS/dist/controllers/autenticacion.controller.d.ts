import type { Request, Response, NextFunction } from "express";
/**
 * POST /api/v1/autenticacion/login
 * Body: { correo: string, contrasena: string }
 */
export declare function iniciarSesion(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
//# sourceMappingURL=autenticacion.controller.d.ts.map