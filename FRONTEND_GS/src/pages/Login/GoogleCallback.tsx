// src/pages/Login/GoogleCallback.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/auth-context";
import type { UsuarioPublico } from "../../types/Usuario";
import { rutaPorRol } from "../../utils/rutaPorRol";

export default function GoogleCallback(): JSX.Element {
  const navigate = useNavigate();
  const { setToken, setUsuario } = useAuth();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const usuarioString = urlParams.get("usuario");

    if (!token || !usuarioString) {
      navigate("/login", { replace: true });
      return;
    }

    try {
      const usuario: UsuarioPublico = JSON.parse(
        decodeURIComponent(usuarioString)
      );

      // Guardar en localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("usuario", JSON.stringify(usuario));

      // Guardar en context
      setToken(token);
      setUsuario(usuario);

      // 🔥 Delay IMPORTANTE para evitar redirección incorrecta
      setTimeout(() => {
        navigate(rutaPorRol(usuario.rol), { replace: true });
      }, 200);
    } catch (error) {
      console.error("Error en callback Google:", error);
      navigate("/login", { replace: true });
    }
  }, []);

  return (
    <div className="text-center p-4">
      Redirigiendo…
    </div>
  );
}
