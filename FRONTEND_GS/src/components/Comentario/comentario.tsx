import { useState, useEffect, useCallback } from "react";

import { useAuth } from "../../context/auth-context";
import api from "../../services/api";

interface Comentario {
  idComentario: string;
  autor: string;
  texto: string;
  respuestas: { autor: string; texto: string }[];
}

export default function ComentariosPanel({ idTopico }: { idTopico: string }) {
  const { usuario } = useAuth();
  const [comentario, setComentario] = useState<Comentario | null>(null);
  const [nuevoTexto, setNuevoTexto] = useState("");
  const [minimizado, setMinimizado] = useState(false);

  // --------------------------------------------------------
  // 🔄 Cargar comentario + respuestas
  // --------------------------------------------------------
  const cargarComentarios = useCallback(async () => {
    try {
      const { data } = await api.get(`/api/v1/comentarios/topicos/${idTopico}/comentarios`);
      setComentario(data.comentario || null);
    } catch (error) {
      console.error("Error cargando comentarios", error);
    }
  }, [idTopico]);

  useEffect(() => {
    cargarComentarios();
  }, [cargarComentarios]);

  // --------------------------------------------------------
  // 📨 Enviar comentario o respuesta
  // --------------------------------------------------------
  const manejarEnviar = async () => {
    if (!nuevoTexto.trim()) return;
    if (!usuario) return alert("Debes iniciar sesión para comentar.");

    try {
      if (!comentario) {
        // Comentario principal
        await api.post(`/api/v1/comentarios/topicos/${idTopico}/comentarios`, {
          idUsuario: usuario.id,
          texto: nuevoTexto,
        });
      } else {
        // Respuesta
        await api.post(`/api/v1/comentarios/comentarios/${comentario.idComentario}/respuestas`, {
          idUsuario: usuario.id,
          texto: nuevoTexto,
        });
      }

      setNuevoTexto("");
      await cargarComentarios(); // Refrescar
    } catch (err) {
      console.error(err);
      alert("Error al enviar comentario.");
    }
  };

  // --------------------------------------------------------
  // UI
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
      {/* Botón Minimizar */}
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
                <strong className="text-[#7E3132]">{comentario.autor}</strong>
                <p className="mt-1">{comentario.texto}</p>
              </div>

              {/* Respuestas */}
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