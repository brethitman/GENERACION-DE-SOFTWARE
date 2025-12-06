"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = __importDefault(require("./app"));
const PUERTO = process.env.PORT || 3000;
// Vercel maneja el servidor por su cuenta.
// Solo arrancamos el servidor manualmente si NO estamos en producción (modo local)
if (process.env.NODE_ENV !== 'production') {
    app_1.default.listen(PUERTO, () => {
        console.log(`🚀 Servidor corriendo en http://localhost:${PUERTO}/api/v1/autenticacion/login`);
    });
}
// ⚠️ ESTO ES OBLIGATORIO PARA VERCEL
exports.default = app_1.default;
//# sourceMappingURL=index.js.map