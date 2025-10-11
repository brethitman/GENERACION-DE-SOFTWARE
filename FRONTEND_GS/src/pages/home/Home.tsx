// src/pages/Home/Home.tsx
import { useAuth } from "../../context/auth-context"; // o tu ruta real del hook

export default function Home() {
  const { cargandoAuth, estaAutenticado, usuario } = useAuth();

  if (cargandoAuth) {
  return (
    <section className="min-h-screen bg-gray-100 text-gray-900 flex flex-col items-center justify-center p-8 space-y-6">
      <header className="text-center mb-6 w-full">
        <h2 className="text-2xl font-bold">Bienvenido al Curso</h2>
        <h1 className="text-3xl font-bold text-[#7E3132] mt-2">INTRODUCCION A LA PROGRAMACION</h1>
        <p className="text-xl text-gray-700 mt-4">
          Este curso está diseñado para enseñarte los fundamentos de la programación en Python. Aprenderás conceptos básicos de programación, como variables, operadores, estructuras de control y cómo escribir programas sencillos. Al finalizar, tendrás los conocimientos necesarios para desarrollar programas pequeños y comprender los principios básicos de la programación.
        </p>
      </header>
      <div className="w-full max-w-md text-center mt-8">
        <p className="text-lg text-gray-700 mb-4">Cargando...</p>
        <div className="animate-pulse h-5 bg-gray-200 rounded w-1/3 mx-auto" />
      </div>
    </section>
  );
}

return (
  <section className="min-h-screen bg-gray-100 text-gray-900 flex flex-col items-center justify-start p-8 space-y-6">
    {estaAutenticado ? (
      <>
        <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white text-lg font-semibold">
            {usuario?.nombre?.[0] ?? "U"}
          </div>
          <div>
            <h2 className="font-medium text-gray-900">{usuario?.nombre}</h2>
            <p className="text-sm text-gray-500 capitalize">Rol: {usuario?.rol ?? "no definido"}</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="font-semibold text-gray-900">Resumen general</h3>
            <p className="text-sm text-gray-600 mt-1">Aquí podrás ver tu progreso y estadísticas principales.</p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="font-semibold text-gray-900">Actividades</h3>
            <p className="text-sm text-gray-600 mt-1">Mantente al tanto de tus tareas y actividades recientes.</p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="font-semibold text-gray-900">Noticias</h3>
            <p className="text-sm text-gray-600 mt-1">Revisa las últimas novedades de la plataforma.</p>
          </div>
        </div>
      </>
      ) : (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col items-center justify-start p-8">
          <header className="text-center mb-6 w-full">
        <h2 className="text-2xl font-bold">Bienvenido al Curso</h2>
        <h1 className="text-3xl font-bold text-[#7E3132] mt-2">INTRODUCCION A LA PROGRAMACION</h1>
        <p className="text-xl text-gray-700 mt-4">
          Este curso está diseñado para enseñarte los fundamentos de la programación en Python. Aprenderás conceptos básicos de programación, como variables, operadores, estructuras de control y cómo escribir programas sencillos. Al finalizar, tendrás los conocimientos necesarios para desarrollar programas pequeños y comprender los principios básicos de la programación.
        </p>
      </header>

      <div className="w-full max-w-md text-center mt-8">
        <p className="text-lg text-gray-700 mb-4">
          Ingrese el código dado por el docente:
        </p>
        <input
          type="text"
          placeholder="Ingrese el código"
          className="mt-4 w-full border border-stone-600 rounded-lg px-3 py-2 outline-none focus:ring-0 focus:border-[#C25051]"
        />
        <button className="mt-4 w-full rounded-lg py-2 bg-[#7E3132] text-white hover:bg-[#712C2D]">
          Matricularse
        </button>
      </div>
        </div>
      )}
    </section>
  );
}
