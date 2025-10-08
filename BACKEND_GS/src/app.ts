// ===== Builtin (Node.js) =====
import path from "path";

// ===== External (node_modules) =====
import cors from "cors";
import express from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import yaml from "yamljs";

// ===== Internal (archivos locales) =====
import { manejadorErrores } from "./middlewares/error.middleware";
import rutasAutenticacion from "./routes/autenticacion.routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Swagger
const swaggerFilePath = path.resolve(process.cwd(), "src/swagger/docLogin.yaml");
const swaggerDocument = yaml.load(swaggerFilePath);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get("/docs-json", (_req, res) => res.json(swaggerDocument));

// Rutas
app.use("/api/v1/autenticacion", rutasAutenticacion);

// Middleware de errores (siempre al final)
app.use(manejadorErrores);

export default app;
