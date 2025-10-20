export default function RolesUsuario() {
  return (
    <div className="p-6 max-w-5xl mx-auto bg-white rounded-lg shadow">
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

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse rounded-lg overflow-hidden shadow">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Nombre de Docente</th>
              <th className="px-4 py-2 text-left">Correo</th>
              <th className="px-4 py-2 text-left">Rol Actual</th>
              <th className="px-4 py-2 text-left">Estado</th>
              <th className="px-4 py-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="px-4 py-2">Michael Ernesto Vargas Gutierres</td>
              <td className="px-4 py-2">miguel@gmail.com</td>
              <td className="px-4 py-2">Estudiante</td>
              <td className="px-4 py-2">Activo</td>
              <td className="px-4 py-2 space-y-1 flex flex-col">
                <button className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700">
                  Asignar rol Docente Editor
                </button>
                <button className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700">
                  Asignar rol Docente Ejecutor
                </button>
              </td>
            </tr>

            <tr className="border-b">
              <td className="px-4 py-2">Miriam Quispe Nereida</td>
              <td className="px-4 py-2">miriam@gmail.com</td>
              <td className="px-4 py-2">Docente Editor</td>
              <td className="px-4 py-2">Activo</td>
              <td className="px-4 py-2 space-y-1 flex flex-col">
                <button className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700">
                  Asignar rol Estudiante
                </button>
                <button className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700">
                  Asignar rol Docente Ejecutor
                </button>
              </td>
            </tr>

            <tr className="border-b">
              <td className="px-4 py-2">Julio Cesar Ademar Escalera</td>
              <td className="px-4 py-2">julio@gmail.com</td>
              <td className="px-4 py-2">Docente Ejecutor</td>
              <td className="px-4 py-2">Activo</td>
              <td className="px-4 py-2 space-y-1 flex flex-col">
                <button className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700">
                  Asignar rol Estudiante
                </button>
                <button className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700">
                  Asignar rol Docente Editor
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
