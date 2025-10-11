import React, { useEffect, useState } from "react";

// Definimos la estructura del tipo Usuario para TypeScript
interface Usuario {
  id: string;
  nombre: string;
  correo: string;
  rol: string;
  activo?: boolean;
}

export default function PanelAdmin() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  // Esta función simula obtener los datos desde el backend.
  const obtenerUsuarios = async () => {
    try {
      // Aquí deberías hacer una llamada al backend para obtener los usuarios
      const response = await fetch("/api/usuarios"); // Ruta del backend para obtener usuarios
      const data = await response.json();
      if (data.ok) {
        setUsuarios(data.datos); // Se setea el estado con los usuarios obtenidos
      }
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  useEffect(() => {
    obtenerUsuarios(); // Llamamos a la función para cargar los usuarios cuando el componente se monta
  }, []);

  const handlePromoteToTeacherEdit = (id: string) => {
    console.log(`Editar para promover a docente con id: ${id}`);
    // Lógica para editar
  };

  const handlePromoteToTeacherExecute = (id: string) => {
    console.log(`Ejecutar para promover a docente con id: ${id}`);
    // Lógica para ejecutar promoción
  };

  const handleDisableUser = (id: string) => {
    console.log(`Deshabilitar usuario con id: ${id}`);
    // Lógica para deshabilitar usuario
  };

  return (
    <section className="min-h-screen bg-gray-100 text-gray-900 p-8">
      <header className="text-center mb-6 w-full">
        <h1 className="text-3xl font-bold text-[#7E3132] mt-2">Lista de Usuarios</h1>
      </header>

      <div className="overflow-x-auto bg-white shadow-lg rounded-xl p-4">
        {usuarios.length === 0 ? (
          <p className="text-lg text-gray-700 text-center">No hay usuarios</p>
        ) : (
          <table className="w-full table-auto text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left">Nombre Completo</th>
                <th className="px-4 py-2 text-left">Correo</th>
                <th className="px-4 py-2 text-left">Contraseña</th>
                <th className="px-4 py-2 text-left">Rol</th>
                <th className="px-4 py-2 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{usuario.nombre}</td>
                  <td className="px-4 py-2">{usuario.correo}</td>
                  <td className="px-4 py-2">********</td> {/* Aquí puedes mostrar la contraseña de alguna manera más segura */}
                  <td className="px-4 py-2">{usuario.rol}</td>
                  <td className="px-4 py-2 flex gap-3">
                    <button
                      className="text-blue-500 hover:underline"
                      onClick={() => handlePromoteToTeacherEdit(usuario.id)}
                    >
                      Promover a Docente (Editar)
                    </button>
                    <button
                      className="text-green-500 hover:underline"
                      onClick={() => handlePromoteToTeacherExecute(usuario.id)}
                    >
                      Promover a Docente (Ejecutar)
                    </button>
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => handleDisableUser(usuario.id)}
                    >
                      Deshabilitar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
