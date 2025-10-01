import dotenv from "dotenv";
dotenv.config();

import app from "./app";

const PUERTO = process.env.PUERTO || 3000;

app.listen(PUERTO, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PUERTO}/api/v1/autenticacion/login`);
});
