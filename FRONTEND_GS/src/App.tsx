// src/App.tsx

// ===== External =====
import { Route, Routes } from "react-router-dom";

// ===== Internal =====
import RutaPrivada from "./components/RutaPrivada/RutaPrivada";
import MainLayout from "./layouts/MainLayout";
import EditarTopico from "./pages/DocenteEditor/EditarTopico";
import GoogleCallback from "./pages/Login/GoogleCallback";
import Login from "./pages/Login/Login";
import Registro from "./pages/Registro/Registro";
import VerTopico from "./pages/Topico/VerTopico";
import Users from "./pages/Users/Users";
import Verificacion from "./pages/Verificacion/Verificacion";
import AdmiVerCurso from "./pages/admi/AdmiVerCurso";
import Roles from "./pages/admi/GestionarRoles";
import Home from "./pages/home/Home";
import PanelAdmin from "./pages/panels/PanelAdmin";
import PanelDocenteEditor from "./pages/panels/PanelDocenteEditor";
import PanelDocenteEjecutor from "./pages/panels/PanelDocenteEjecutor";
import PanelEstudiante from "./pages/panels/PanelEstudiante";

// ⬅️ NUEVO

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>

        {/* Público */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />

        {/* ⬅️ NUEVO callback de Google */}
        <Route path="/auth/google-success" element={<GoogleCallback />} />

        <Route path="/roles" element={<Roles />} />
        <Route path="/CursoAdmi" element={<AdmiVerCurso />} />

        <Route path="/verificacion" element={<Verificacion />} />

        {/* Privado */}
        <Route
          path="/usuarios"
          element={
            <RutaPrivada>
              <Users />
            </RutaPrivada>
          }
        />

        <Route
          path="/panel/admin"
          element={
            <RutaPrivada>
              <PanelAdmin />
            </RutaPrivada>
          }
        />

        <Route
          path="/panel/estudiante"
          element={
            <RutaPrivada>
              <PanelEstudiante />
            </RutaPrivada>
          }
        />

        <Route
          path="/panel/docente-editor"
          element={
            <RutaPrivada>
              <PanelDocenteEditor />
            </RutaPrivada>
          }
        />

        <Route
          path="/editar-topico/:id"
          element={
            <RutaPrivada>
              <EditarTopico />
            </RutaPrivada>
          }
        />

        <Route
          path="/panel/docente-ejecutor"
          element={
            <RutaPrivada>
              <PanelDocenteEjecutor />
            </RutaPrivada>
          }
        />

        <Route
          path="/ver-topico/:id"
          element={
            <RutaPrivada>
              <VerTopico />
            </RutaPrivada>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}
