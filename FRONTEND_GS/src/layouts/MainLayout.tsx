// MainLayout.tsx
import { Outlet } from "react-router-dom";

import Header from "../components/Header/Header";


export default function MainLayout() {
  return (
    <div className="min-h-dvh flex flex-col bg-white text-gray-900">
      <Header />
      {/* ⬇️ ancho completo */}
      <main className="flex-1 w-full px-4 py-6">
        <Outlet />
      </main>
      <footer className="border-t py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Plataforma Educativa
      </footer>
    </div>
  );
}
