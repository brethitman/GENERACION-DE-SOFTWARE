// src/layouts/MainLayout.tsx
import { Outlet } from "react-router-dom";

import Header from "../components/Header/Header";
import { useAuth } from "../context/auth-context"; // ⬅️ usa el hook del contexto real

export default function MainLayout() {
  const { cargandoAuth } = useAuth();

  // Evita mostrar layout incompleto hasta hidratar auth
  if (cargandoAuth) {
    return (
      <div className="min-h-dvh flex items-center justify-center">
        {/* Puedes poner un spinner/skeleton aquí */}
        <span className="text-sm text-gray-500">Cargando…</span>
      </div>
    );
  }

  return (
    <div className="min-h-dvh flex flex-col bg-white text-gray-900">
      <Header />
      <main className="flex-1 w-full px-4 py-6">
        <Outlet />
      </main>
      <footer className="border-t py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Plataforma Educativa
      </footer>
    </div>
  );
}
