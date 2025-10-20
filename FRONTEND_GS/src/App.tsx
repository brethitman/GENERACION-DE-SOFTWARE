// src/App.tsx

// ===== External =====
import { Route, Routes } from "react-router-dom";

// ===== Internal =====
import RutaPrivada from "./components/RutaPrivada/RutaPrivada";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Registro from "./pages/Registro/Registro";
import Users from "./pages/Users/Users";
import PanelEstudiante from "./pages/panels/PanelEstudiante";
import PanelAdmin from "./pages/panels/PanelAdmin";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* Público */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
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

        {/* Fallback */}
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}