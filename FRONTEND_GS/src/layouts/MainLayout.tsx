import { Outlet } from "react-router-dom";

import Header from "../components/Header/Header";
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
    <div className="min-h-dvh flex flex-col bg-[#F3F3F3] text-gray-900">
      <Header />
      <main className="flex-1 w-full px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
