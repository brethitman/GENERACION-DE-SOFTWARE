// src/pages/Login/GoogleCallback.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/auth-context";
import type { UsuarioPublico } from "../../types/Usuario";
import { rutaPorRol } from "../../utils/rutaPorRol";

export default function GoogleCallback() {

  const navigate = useNavigate();
  const { setToken, setUsuario } = useAuth();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const usuarioString = urlParams.get("usuario");

    console.log("📥 Callback Google recibido:");
    console.log("token:", token);
    console.log("usuarioString:", usuarioString);

    // ❌ Si falta token o usuario → login
    if (!token || !usuarioString) {
      console.error("❌ GoogleCallback: token o usuario faltantes");
      navigate("/login", { replace: true });
      return;
    }

    try {
      const rawUser = JSON.parse(decodeURIComponent(usuarioString));
      console.log("🧩 Usuario recibido RAW:", rawUser);

      // 🔍 Normalización (por si backend envía id_usuario, nombre_completo, etc.)
      const usuario: UsuarioPublico = {
        id: Number(rawUser.id ?? rawUser.id_usuario),
        nombre: rawUser.nombre ?? rawUser.nombre_completo,
        correo: rawUser.correo,
        rol: rawUser.rol,
        activo: rawUser.activo ?? true,
        verificado: rawUser.verificado ?? true,
      };

      console.log("✅ Usuario normalizado:", usuario);

      // 🧊 Guardar en localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("usuario", JSON.stringify(usuario));

      // 🔐 Guardar en contexto
      setToken?.(token);
      setUsuario?.(usuario);

      // ⏳ Delay crítico → evita que un guard de rutas te mande al login
      setTimeout(() => {
        const destino = rutaPorRol(usuario.rol);
        console.log("➡️ Redirigiendo a:", destino);
        navigate(destino, { replace: true });
      }, 200);
      
    } catch (error) {
      console.error("❌ Error parseando usuario Google:", error);
      navigate("/login", { replace: true });
    }
  }, [navigate, setToken, setUsuario]);

  return (
    <div className="text-center p-4">
      Redirigiendo…
    </div>
  );
}
