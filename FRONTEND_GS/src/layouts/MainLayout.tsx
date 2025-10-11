// src/layouts/MainLayout.tsx
import { Outlet } from "react-router-dom";

import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import { useAuth } from "../context/auth-context";

export default function MainLayout() {
  const { cargandoAuth } = useAuth();

  if (cargandoAuth) {
    return (
      <div className="min-h-dvh flex items-center justify-center">
        <span className="text-sm text-gray-500">Cargando…</span>
      </div>
    );
  }

  return (
    <div className="min-h-dvh flex flex-col bg-white text-gray-900">
      {/* Header superior */}
      <Header />

      {/* Contenedor principal: Sidebar + contenido dinámico */}
      <div className="flex flex-1">
        {/* Sidebar SIEMPRE visible */}
        <Sidebar />

        {/* Contenido de las páginas */}
        <main className="flex-1 px-4 py-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Plataforma Educativa
      </footer>
    </div>
  );
}
