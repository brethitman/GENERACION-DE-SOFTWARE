// src/components/Sidebar/Sidebar.tsx
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { useAuth } from "../../hooks/useProvideAuth";

export default function Sidebar() {
  const { estaAutenticado } = useAuth();
  const [search, setSearch] = useState("");

  useEffect(() => {
    console.log("Sidebar montado");
  }, []);

  const menuItems = [
    { name: "Usuario Estudiante", rol: "estudiante", path: "/panel/estudiante" },
    { name: "Docente Editor", rol: "editor", path: "/panel/editor" },
    { name: "Docente Ejecutor", rol: "ejecutor", path: "/panel/ejecutor" },
    { name: "Administrador", rol: "admin", path: "/panel/admin" },
  ];

  // Filtrar elementos según la búsqueda
  const filteredItems = menuItems.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <aside className="w-64 h-screen bg-white border-r shadow-sm">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">ClubDelFrijol</h2>
        <p className="text-sm text-gray-500 mb-4">Selecciona tu rol para continuar</p>

        <input
          type="text"
          placeholder="Buscar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring focus:ring-rose-200 mb-4"
        />

        <nav className="flex flex-col space-y-2">
          {filteredItems.map((item) => (
            <NavLink
              key={item.path}
              to={estaAutenticado ? item.path : `/login?rol=${item.rol}`}
              className={({ isActive }) =>
                "block w-full text-left px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition" +
                (isActive ? " bg-gray-200 font-semibold" : "")
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  ); 
}
