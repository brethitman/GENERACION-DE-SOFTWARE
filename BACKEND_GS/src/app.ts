// ===== External =====
import cors from "cors";
import express from "express";
import session from "express-session";
import morgan from "morgan";
import passport from "passport"; // Importa Passport

// ===== Internos =====
import { manejadorErrores } from "./middlewares/error.middleware";
import rutasAutenticacion from "./routes/autenticacion.routes";
import "./infrastructure/passport-google"; // Importa la configuración de Passport para Google

const app = express();

// CORS (habilita cookies si luego las usas)
app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));
app.use(express.json());
app.use(morgan("dev"));

// 🔐 Sessions: requerido por passport-google-oidc
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
  })
);

// Inicializa Passport
app.use(passport.initialize()); // ✅ Asegúrate de inicializar Passport

// Rutas
app.use("/api/v1/autenticacion", rutasAutenticacion);

// Errores (al final)
app.use(manejadorErrores);

export default app;
