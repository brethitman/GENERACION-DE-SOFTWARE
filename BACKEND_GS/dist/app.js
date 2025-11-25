"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// ===== External =====
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const morgan_1 = __importDefault(require("morgan"));
// ===== Internos =====
const passport_google_1 = __importDefault(require("./config/passport.google"));
const error_middleware_1 = require("./middlewares/error.middleware");
const autenticacion_routes_1 = __importDefault(require("./routes/autenticacion.routes"));
const cloudinary_routes_1 = __importDefault(require("./routes/cloudinary.routes"));
const cursos_routes_1 = __importDefault(require("./routes/cursos.routes"));
const google_routes_1 = __importDefault(require("./routes/google.routes"));
const topicos_routes_1 = __importDefault(require("./routes/topicos.routes"));
const usuarios_routes_1 = __importDefault(require("./routes/usuarios.routes"));
const comentarios_routes_1 = __importDefault(require("./routes/comentarios.routes"));
const app = (0, express_1.default)();
// CORS (habilita cookies si luego las usas)
app.use((0, cors_1.default)({ origin: ["http://localhost:5173"], credentials: true }));
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
// 🔐 Sessions: requerido por passport-google-oidc
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));
// 🔐 Passport SIEMPRE después de session
app.use(passport_google_1.default.initialize());
app.use(passport_google_1.default.session());
// Rutas
app.use("/api/v1/autenticacion", autenticacion_routes_1.default);
app.use("/api/v1/autenticacion", google_routes_1.default);
app.use("/api/v1/usuarios", usuarios_routes_1.default);
app.use("/api/v1/topicos", topicos_routes_1.default);
app.use("/api/v1/cursos", cursos_routes_1.default);
app.use("/api/v1/comentarios", comentarios_routes_1.default);
// Errores (al final)
app.use(error_middleware_1.manejadorErrores);
//para subir imgs
app.use("/api/cloudinary", cloudinary_routes_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map