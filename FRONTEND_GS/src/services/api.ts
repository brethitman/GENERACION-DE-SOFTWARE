// src/services/api.ts
import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

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
