// ===== External =====
import cors from "cors";
import express from "express";
import session from "express-session";
import morgan from "morgan";

// ===== Internos =====
import passport from "./config/passport.google";
import { manejadorErrores } from "./middlewares/error.middleware";
import rutasAutenticacion from "./routes/autenticacion.routes";
import cloudinaryRoutes from "./routes/cloudinary.routes";
import cursosRoutes from "./routes/cursos.routes";
import rutasGoogle from "./routes/google.routes";
import topicosRoutes from "./routes/topicos.routes";
import usuariosRoutes from "./routes/usuarios.routes";

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

// 🔐 Passport SIEMPRE después de session
app.use(passport.initialize());
app.use(passport.session());

// Rutas
app.use("/api/v1/autenticacion", rutasAutenticacion);
app.use("/api/v1/autenticacion", rutasGoogle);

app.use("/api/v1/usuarios", usuariosRoutes);

app.use("/api/v1/topicos", topicosRoutes);
app.use("/api/v1/cursos", cursosRoutes);

// Errores (al final)
app.use(manejadorErrores);

//para subir imgs
app.use("/api/cloudinary", cloudinaryRoutes);

export default app;
