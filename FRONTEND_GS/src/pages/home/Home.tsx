import { useAuth } from "../../hooks/useAuth";

export default function Home() {
  const { estaAutenticado, usuario } = useAuth();

  return (
    <section className="space-y-6">
      {/* Cabecera */}
      <header className="rounded-xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 p-6 text-white shadow">
        <h1 className="text-2xl font-semibold">Inicio</h1>
        <p className="text-sm opacity-90 mt-1">
          {estaAutenticado
            ? "Bienvenido a tu panel principal."
            : "Inicia sesión para acceder a tu cuenta."}
        </p>
      </header>

      {estaAutenticado ? (
        <>
          {/* Perfil */}
          <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white text-lg font-semibold">
              {usuario?.nombre?.[0] ?? "U"}
            </div>
            <div>
              <h2 className="font-medium text-gray-900">{usuario?.nombre}</h2>
              <p className="text-sm text-gray-500 capitalize">
                Rol: {usuario?.rol ?? "no definido"}
              </p>
            </div>
          </div>

          {/* Contenido informativo */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <h3 className="font-semibold text-gray-900">Resumen general</h3>
              <p className="text-sm text-gray-600 mt-1">
                Aquí podrás ver tu progreso y estadísticas principales.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <h3 className="font-semibold text-gray-900">Actividades</h3>
              <p className="text-sm text-gray-600 mt-1">
                Mantente al tanto de tus tareas y actividades recientes.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <h3 className="font-semibold text-gray-900">Noticias</h3>
              <p className="text-sm text-gray-600 mt-1">
                Revisa las últimas novedades de la plataforma.
              </p>
            </div>
          </div>
        </>
      ) : (
        // No autenticado
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm text-center">
          <h2 className="text-lg font-semibold text-gray-900">
            Bienvenido a la plataforma
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Para acceder al contenido, por favor inicia sesión.
          </p>
        </div>
      )}
    </section>
  );
}
