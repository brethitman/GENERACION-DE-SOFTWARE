// src/pages/Login/GoogleCallback.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../../src/context/auth-context";
import type { UsuarioPublico } from "../../../src/types/Usuario";
import { rutaPorRol } from "../../../src/utils/rutaPorRol";

export default function GoogleCallback(): JSX.Element {
  const navigate = useNavigate();
  const { setToken, setUsuario } = useAuth();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token: string | null = urlParams.get("token");
    const usuarioString: string | null = urlParams.get("usuario");

    if (token && usuarioString) {
      try {
        const usuario: UsuarioPublico = JSON.parse(decodeURIComponent(usuarioString));
        localStorage.setItem("token", token);
        localStorage.setItem("usuario", JSON.stringify(usuario));

        if (setToken && setUsuario) {
          setToken(token);
          setUsuario(usuario);
        }

        navigate(rutaPorRol(usuario.rol), { replace: true });
      } catch (err: unknown) {
        console.error("Error al procesar la respuesta de Google:", err instanceof Error ? err.message : err);
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate, setToken, setUsuario]);

  return <div className="text-center p-4">Redirigiendo...</div>;
}
