"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = __importDefault(require("./app"));
const PUERTO = process.env.PUERTO || 5432 ;
app_1.default.listen(PUERTO, () => {
    console.log(`🚀 Servidor corriendo en https://el-club-del-frijol-frontend.onrender.com/api/v1/autenticacion/login`);
});
//# sourceMappingURL=index.js.map