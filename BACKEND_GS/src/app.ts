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
import comentariosRoutes from "./routes/comentarios.routes";
import cursosRoutes from "./routes/cursos.routes";
import rutasGoogle from "./routes/google.routes";
import topicosRoutes from "./routes/topicos.routes";
import usuariosRoutes from "./routes/usuarios.routes";

const app = express();

// ==========================================
// ✅ CORS CORREGIDO (Sin 'any' y funcional)
// ==========================================
const allowedOrigins = [
  "https://generacionfront.vercel.app", // Producción
  "http://localhost:5173"               // Desarrollo local
];

// Configuración reutilizable
const corsConfig = {
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
};

// 1. Aplicar CORS general
app.use(cors(corsConfig));

// 2. 🔥 SOLUCIÓN AL ERROR ROJO: Habilitar explícitamente las peticiones OPTIONS (Preflight)
app.options("*", cors(corsConfig));

app.use(express.json());
app.use(morgan("dev"));

// 🔐 Sessions: requerido por passport-google-oidc
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
      // En producción (Vercel) secure debe ser true, en local false.
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", 
    }
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
app.use("/api/v1/comentarios", comentariosRoutes);

// Errores (al final)
app.use(manejadorErrores);

//para subir imgs
app.use("/api/cloudinary", cloudinaryRoutes);

export default app;