// src/services/api.ts
import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL ?? "https://el-club-del-frijol.onrender.com";

const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

// ✅ Helper para sincronizar el Authorization cuando cambie el token
export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
};

// ✅ Hidrata por si hay token ya guardado (primer render)
setAuthToken(localStorage.getItem("token"));

// (opcional) Mantén este interceptor por si se pierde el default:
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
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
