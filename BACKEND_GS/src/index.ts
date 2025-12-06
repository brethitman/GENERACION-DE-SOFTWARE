import dotenv from "dotenv";
dotenv.config();

import app from "./app";

const PUERTO = process.env.PORT || 3000;

// Vercel maneja el servidor por su cuenta.
// Solo arrancamos el servidor manualmente si NO estamos en producción (modo local)
if (process.env.NODE_ENV !== 'production') {
    app.listen(PUERTO, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PUERTO}/api/v1/autenticacion/login`);
    });
}

// ⚠️ ESTO ES OBLIGATORIO PARA VERCEL
export default app;