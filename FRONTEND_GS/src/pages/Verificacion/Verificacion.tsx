import { useState, useEffect } from "react";
import { CiMail } from "react-icons/ci";
import { useNavigate, useLocation } from "react-router-dom";

import { useAuth } from "../../context/auth-context";

export default function Verificacion() {
  const [codigo, setCodigo] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);
  const [reenviando, setReenviando] = useState(false);
  const [tiempoRestante, setTiempoRestante] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();
  const { verificarCodigo, reenviarCodigo } = useAuth();

  const { usuarioId, correo } = location.state || {};

  // ✅ Redirigir si no hay usuarioId
  useEffect(() => {
    if (!usuarioId) {
      navigate("/login");
    }
  }, [usuarioId, navigate]);

  // ✅ Timer para reenviar código
  useEffect(() => {
    if (tiempoRestante > 0) {
      const timer = setTimeout(() => setTiempoRestante(tiempoRestante - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [tiempoRestante]);

  const iniciarTemporizador = () => {
    setTiempoRestante(60); // 60 segundos
  };

  const manejarCambioCodigo = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const nuevoCodigo = [...codigo];
    nuevoCodigo[index] = value;
    setCodigo(nuevoCodigo);

    // Auto-focus al siguiente input
    if (value && index < 5) {
      const siguienteInput = document.getElementById(`codigo-${index + 1}`);
      if (siguienteInput) siguienteInput.focus();
    }
  };

  const manejarKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !codigo[index] && index > 0) {
      const anteriorInput = document.getElementById(`codigo-${index - 1}`);
      if (anteriorInput) anteriorInput.focus();
    }
  };

  const verificar = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setCargando(true);

    const codigoCompleto = codigo.join("");
    
    if (codigoCompleto.length !== 6) {
      setError("Por favor ingresa el código completo de 6 dígitos");
      setCargando(false);
      return;
    }

    try {
      await verificarCodigo(usuarioId, codigoCompleto);
      // ✅ Después de verificar, redirigir al login para que inicien sesión
      navigate("/login", { 
        state: { 
          mensaje: "¡Correo verificado exitosamente! Ya puedes iniciar sesión." 
        } 
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error al verificar el código";
      setError(msg);
    } finally {
      setCargando(false);
    }
  };

  const manejarReenviarCodigo = async () => {
    setReenviando(true);
    setError(null);

    try {
      await reenviarCodigo(usuarioId);
      iniciarTemporizador();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error al reenviar el código";
      setError(msg);
    } finally {
      setReenviando(false);
    }
  };

  if (!usuarioId) {
    return null;
  }

  return (
    <section className="max-w-md mx-auto bg-white rounded-2xl border border-neutral-400 p-12 shadow-xl">
      <h1 className="text-xl text-[#7E3132] font-bold mb-3 text-center">VERIFICAR CORREO</h1>
      
      <div className="flex items-center justify-center mb-4">
        <CiMail className="w-8 h-8 text-[#7E3132] mr-2" />
        <span className="text-sm text-gray-600">{correo}</span>
      </div>

      <p className="text-sm text-gray-600 text-center mb-6">
        Hemos enviado un código de verificación de 6 dígitos a tu correo electrónico.
      </p>

      {/* ✅ Agregar label para el grupo de inputs */}
      <form onSubmit={verificar}>
        <div className="mb-2">
          <label htmlFor="codigo-0" className="block text-sm font-medium text-gray-700 text-center mb-2">
            Código de verificación
          </label>
        </div>
        
        <div className="flex justify-center space-x-2 mb-6">
          {codigo.map((digit, index) => (
            <input
              key={index}
              id={`codigo-${index}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => manejarCambioCodigo(index, e.target.value)}
              onKeyDown={(e) => manejarKeyDown(index, e)}
              // ✅ Agregar aria-label y placeholder para accesibilidad
              aria-label={`Dígito ${index + 1} del código de verificación`}
              placeholder={index === 0 ? "0" : ""}
              className="w-12 h-12 text-center text-xl font-semibold border border-stone-600 rounded-lg focus:border-[#C25051] focus:ring-0"
            />
          ))}
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 rounded-md p-2 mb-4 text-center">
            {error}
          </p>
        )}

        <div className="flex justify-center mb-4">
          <button
            type="submit"
            className="w-5/6 rounded-lg px-4 py-2 bg-[#7E3132] text-white hover:bg-[#712C2D] disabled:opacity-60 transition-all"
            disabled={cargando || codigo.join("").length !== 6}
          >
            {cargando ? "Verificando..." : "Verificar Código"}
          </button>
        </div>
      </form>

      <div className="text-center">
        <button
          type="button"
          onClick={manejarReenviarCodigo}
          disabled={reenviando || tiempoRestante > 0}
          className="text-sm text-[#7E3132] hover:text-[#712C2D] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {reenviando 
            ? "Enviando..." 
            : tiempoRestante > 0 
            ? `Reenviar código en ${tiempoRestante}s` 
            : "¿No recibiste el código? Reenviar"
          }
        </button>
      </div>

      <p className="text-sm text-gray-600 text-center mt-4">
        ¿Volver al inicio de sesión?{" "}
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="font-semibold text-[#7E3132] hover:text-[#712C2D] hover:underline"
        >
          Iniciar sesión
        </button>
      </p>
    </section>
  );
}