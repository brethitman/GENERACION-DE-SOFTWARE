import cors from "cors";
import express from "express";
import morgan from "morgan";

import { manejadorErrores } from "./middlewares/error.middleware";
import rutasAutenticacion from "./routes/autenticacion.routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Rutas
app.use("/api/v1/autenticacion", rutasAutenticacion);

// Middleware de errores
app.use(manejadorErrores);

export default app;
