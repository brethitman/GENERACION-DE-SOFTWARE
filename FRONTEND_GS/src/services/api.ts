import axios from "axios";

// 1. CONFIGURACIÓN CORRECTA PARA VITE
// Usamos import.meta.env (nativo de Vite).
// Si VITE_API_URL no existe (local), usa localhost:3000.
const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

// ✅ Helper para sincronizar el Authorization
export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
};

// 2. PROTECCIÓN CONTRA PANTALLA BLANCA
// Envolvemos localStorage en un try/catch seguro.
try {
  const token = localStorage.getItem("token");
  if (token) {
    setAuthToken(token);
  }
} catch (error) {
  console.error("No se pudo acceder al almacenamiento local", error);
}

// 3. INTERCEPTOR (Protegido)
api.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
  } catch {
    // ✅ CORREGIDO: Quitamos (error) porque no se usaba.
    // Ignoramos errores de storage para dejar pasar la petición
  }
  return config;
});

api.interceptors.response.use(
  (r) => r,
  (error) => {
    const msg =
      error?.response?.data?.mensaje ??
      error?.message ??
      "Error de red o del servidor";
    return Promise.reject(new Error(msg));
  }
);

export default api;