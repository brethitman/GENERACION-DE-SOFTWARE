import { useState } from "react";

import { useAuth } from "../../hooks/useAuth";

interface Comentario {
  autor: string;
  texto: string;
  respuestas: { autor: string; texto: string }[];
}

export default function ComentariosPanel() {
  const { usuario } = useAuth(); // ✅ obtenemos el usuario actual
  const [comentario, setComentario] = useState<Comentario | null>(null);
  const [nuevoTexto, setNuevoTexto] = useState("");
  const [minimizado, setMinimizado] = useState(false);

  const manejarEnviar = () => {
    if (!nuevoTexto.trim()) return;
    if (!usuario) return alert("Debes iniciar sesión para comentar.");

    const nuevoComentario = { autor: usuario.nombre, texto: nuevoTexto }; // ✅ usamos el nombre del usuario actual

    if (!comentario) {
      // Crear comentario principal
      setComentario({ ...nuevoComentario, respuestas: [] });
    } else {
      // Agregar respuesta
      setComentario({
        ...comentario,
        respuestas: [...comentario.respuestas, nuevoComentario],
      });
    }
    setNuevoTexto("");
  };

  return (
    <div
      className={`absolute right-0 bg-white shadow-lg border-l border-gray-200 transition-all duration-300 flex flex-col ${
        minimizado ? "w-12" : "w-80"
      }`}
      style={{
        top: "125px",
        height: "calc(100vh - 125px)",
      }}
    >
      {/* Botón de minimizar / expandir */}
      <button
        onClick={() => setMinimizado(!minimizado)}
        className="absolute top-4 left-[-40px] bg-[#7E3132] text-white rounded-l-md px-2 py-1 text-sm hover:bg-[#5b2425]"
      >
        {minimizado ? "🗨️" : "→"}
      </button>

      {!minimizado && (
        <div className="flex flex-col flex-grow p-4 overflow-y-auto">
          <h2 className="text-lg font-semibold text-[#7E3132] mb-2">
            Comentarios
          </h2>

          {!comentario ? (
            <p className="text-gray-500 mb-4">
              No hay comentarios aún. ¡Sé el primero!
            </p>
          ) : (
            <div className="mb-4">
              <div className="p-3 bg-gray-100 rounded-md mb-2">
                <strong className="text-[#7E3132]">
                  {comentario.autor}
                </strong>
                <p className="mt-1">{comentario.texto}</p>
              </div>

              {comentario.respuestas.length > 0 && (
                <div className="ml-3 border-l pl-3 space-y-2">
                  {comentario.respuestas.map((r, i) => (
                    <div key={i} className="p-2 bg-gray-50 rounded-md">
                      <strong className="text-[#7E3132]">{r.autor}</strong>
                      <p>{r.texto}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Caja de texto */}
          <div className="mt-auto">
            <textarea
              value={nuevoTexto}
              onChange={(e) => setNuevoTexto(e.target.value)}
              placeholder={
                comentario
                  ? "Agrega una respuesta..."
                  : "Escribe un comentario..."
              }
              className="w-full border rounded-md p-2 text-sm focus:outline-[#7E3132]"
            />
            <button
              onClick={manejarEnviar}
              className="mt-2 w-full bg-[#7E3132] text-white py-1 rounded-md hover:bg-[#5b2425]"
            >
              Enviar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
