import { useAuth } from "../hooks/useAuth";

export default function Home() {
  const { estaAutenticado, usuario } = useAuth();

  return (
    <section className="space-y-2">
      <h1 className="text-2xl font-semibold">Inicio</h1>
      {estaAutenticado ? (
        <p>
          Hola, <span className="font-medium">{usuario?.nombre}</span>. Rol:{" "}
          <span className="font-medium">{usuario?.rol}</span>.
        </p>
      ) : (
        <p className="text-gray-600">Inicia sesión para ver contenido protegido.</p>
      )}
    </section>
  );
}
