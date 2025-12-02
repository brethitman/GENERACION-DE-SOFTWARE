import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

type Usuario = {
  id: number;
  nombre: string;
  correo: string;
  rol: string;
  activo: boolean;
};

export default function RolesUsuario() {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [cargando, setCargando] = useState(true);

  const handleClick = () => {
    navigate("/panel/admin");
  };

  // 🔹 Cargar usuarios desde backend
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const respuesta = await fetch("https://el-club-del-frijol.onrender.com/api/v1/usuarios");
        const data = await respuesta.json();
        setUsuarios(data.usuarios || []);
      } catch (error) {
        console.error("Error al cargar usuarios", error);
      } finally {
        setCargando(false);
      }
    };
    fetchUsuarios();
  }, []);

  // 🔹 Función para actualizar el rol
  const actualizarRol = async (id: number, nuevoRol: string) => {
    try {
      const respuesta = await fetch(`https://el-club-del-frijol.onrender.com/api/v1/usuarios/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rol: nuevoRol }),
      });

      const data = await respuesta.json();

      if (respuesta.ok) {
        // Actualiza el usuario localmente sin volver a pedir todos los datos
        setUsuarios((prev) =>
          prev.map((u) => (u.id === id ? { ...u, rol: nuevoRol } : u))
        );
      } else {
        alert(data.mensaje || "Error al actualizar el rol");
      }
    } catch (error) {
      console.error("Error al actualizar el rol", error);
      alert("Error de conexión con el servidor");
    }
  };

  // 🔹 Función que decide qué hacer según el rol actual
  const manejarCambioRol = (usuario: Usuario, tipo: "editor" | "ejecutor") => {
    let nuevoRol = "estudiante";

    if (tipo === "editor") {
      nuevoRol = usuario.rol === "editor" ? "estudiante" : "editor";
    } else if (tipo === "ejecutor") {
      nuevoRol = usuario.rol === "ejecutor" ? "estudiante" : "ejecutor";
    }

    actualizarRol(usuario.id, nuevoRol);
  };

  // 🔹 Render
  return (
    <div className="p-6 max-w-5xl mx-auto bg-white rounded-lg shadow">
      <button
        onClick={handleClick}
        className="ml-auto mb-4 flex items-center text-[#7E3132] font-medium hover:underline"
      >
        Ir a Panel Administrativo
        <FaArrowRight className="ml-1" />
      </button>

      <h1 className="text-xl font-bold text-red-700 mb-4">GESTIONAR ROLES DE USUARIO</h1>

      {/* Buscador */}
      <div className="mb-4 flex items-center gap-2">
        <label htmlFor="buscar" className="font-semibold">Buscar Docente:</label>
        <input
          id="buscar"
          type="text"
          placeholder="Buscar por nombre de usuario..."
          className="flex-1 border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-red-300"
        />
      </div>

      {/* Tabla o mensaje */}
      {cargando ? (
        <p className="text-center text-gray-500 py-6">Cargando usuarios...</p>
      ) : usuarios.length === 0 ? (
        <p className="text-center text-gray-500 py-6">No existen usuarios registrados</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-lg overflow-hidden shadow">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Nombre</th>
                <th className="px-4 py-2 text-left">Correo</th>
                <th className="px-4 py-2 text-left">Rol Actual</th>
                <th className="px-4 py-2 text-left">Estado</th>
                <th className="px-4 py-2 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) => (
                <tr key={u.id} className="border-b">
                  <td className="px-4 py-2">{u.nombre}</td>
                  <td className="px-4 py-2">{u.correo}</td>
                  <td className="px-4 py-2">{u.rol}</td>
                  <td className="px-4 py-2">{u.activo ? "Activo" : "Inactivo"}</td>
                  <td className="px-4 py-2 space-y-1 flex flex-col">
                    {/* Botón de Editor */}
                    <button
                      onClick={() => manejarCambioRol(u, "editor")}
                      className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                    >
                      {u.rol === "Docente Editor"
                        ? "Desasignar rol Docente Editor"
                        : "Asignar rol Docente Editor"}
                    </button>

                    {/* Botón de Ejecutor */}
                    <button
                      onClick={() => manejarCambioRol(u, "ejecutor")}
                      className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                    >
                      {u.rol === "Docente Ejecutor"
                        ? "Desasignar rol Docente Ejecutor"
                        : "Asignar rol Docente Ejecutor"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
