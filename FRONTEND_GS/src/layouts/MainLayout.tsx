import { Outlet } from "react-router-dom";

import Header from "../components/Header/Header";

export default function MainLayout() {
  return (
    <div className="min-h-dvh flex flex-col bg-white text-gray-900">
      <Header />
      <main className="container flex-1 p-4">
        <Outlet />
      </main>
      <footer className="border-t py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Plataforma Educativa
      </footer>
    </div>
  );
}
