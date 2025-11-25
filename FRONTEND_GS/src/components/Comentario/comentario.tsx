import { useState, useEffect } from "react";

import { useAuth } from "../../context/auth-context";

interface Comentario {
  idComentario: string;
  autor: string;
  texto: string;
  respuestas: { autor: string; texto: string }[];
}

const API_URL = "http://localhost:3000";

export default function ComentariosPanel({ idTopico }: { idTopico: string }) {
  const { usuario } = useAuth();
  const [comentario, setComentario] = useState<Comentario | null>(null);
  const [nuevoTexto, setNuevoTexto] = useState("");
  const [minimizado, setMinimizado] = useState(false);

  // --------------------------------------------------------
  // 🔄 Cargar comentario + respuestas del backend
  // --------------------------------------------------------
  const cargarComentarios = async () => {
    const res = await fetch(
      `${API_URL}/api/v1/comentarios/topicos/${idTopico}/comentarios`
    );
    const data = await res.json();
    setComentario(data.comentario || null);
  };

  useEffect(() => {
    cargarComentarios();
  }, [idTopico]);

  // --------------------------------------------------------
  // 📨 Enviar comentario o respuesta
  // --------------------------------------------------------
  const manejarEnviar = async () => {
    if (!nuevoTexto.trim()) return;
    if (!usuario) return alert("Debes iniciar sesión para comentar.");

    try {
      if (!comentario) {
        // Crear comentario principal
        await fetch(
          `${API_URL}/api/v1/comentarios/topicos/${idTopico}/comentarios`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              idUsuario: usuario.id,
              texto: nuevoTexto,
            }),
          }
        );
      } else {
        // Crear respuesta al comentario principal
        await fetch(
          `${API_URL}/api/v1/comentarios/comentarios/${comentario.idComentario}/respuestas`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              idUsuario: usuario.id,
              texto: nuevoTexto,
            }),
          }
        );
      }

      setNuevoTexto("");
      await cargarComentarios(); // Recargar desde la DB
    } catch (err) {
      console.error(err);
      alert("Error al enviar comentario.");
    }
  };

  // --------------------------------------------------------
  // RENDER
  // --------------------------------------------------------
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
      {/* Minimizar / Expandir */}
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

          {/* SIN COMENTARIO AÚN */}
          {!comentario ? (
            <p className="text-gray-500 mb-4">
              No hay comentarios aún. ¡Sé el primero!
            </p>
          ) : (
            <div className="mb-4">
              <div className="p-3 bg-gray-100 rounded-md mb-2">
                <strong className="text-[#7E3132]">{comentario.autor}</strong>
                <p className="mt-1">{comentario.texto}</p>
              </div>

              {/* RESPUESTAS */}
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
