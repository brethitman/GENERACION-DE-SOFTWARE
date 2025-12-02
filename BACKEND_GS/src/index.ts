import dotenv from "dotenv";
dotenv.config();

import app from "./app";

const PUERTO = process.env.PUERTO || 3000;

app.listen(PUERTO, () => {
  console.log(`🚀 Servidor corriendo en https://el-club-del-frijol-frontend.onrender.com/api/v1/autenticacion/login`);
});
