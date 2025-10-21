// src/App.tsx

// ===== External =====
import { Route, Routes } from "react-router-dom";

// ===== Internal =====
import RutaPrivada from "./components/RutaPrivada/RutaPrivada";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Login/Login";
import Registro from "./pages/Registro/Registro";
import Users from "./pages/Users/Users";
import Roles from "./pages/admi/GestionarRoles";
import Home from "./pages/home/Home";
import PanelAdmin from "./pages/panels/PanelAdmin";
import PanelDocenteEditor from "./pages/panels/PanelDocenteEditor";
import PanelEstudiante from "./pages/panels/PanelEstudiante";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* Público */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/roles" element={<Roles />} />
    <Route
      path="/panel/admin"
      element={

          <PanelAdmin />

      }
    />


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
        {/* Fallback */}
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}