// src/App.tsx
import { Route, Routes } from "react-router-dom";

import RutaPrivada from "./components/RutaPrivada/RutaPrivada";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home/home";
import GoogleCallback from "./pages/Login/GoogleCallback";
import Login from "./pages/Login/Login";
import Registro from "./pages/Registro/Registro";
import Users from "./pages/Users/Users";
import PanelEstudiante from "./pages/panels/PanelEstudiante";

export default function App(): JSX.Element {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* Público */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/auth/google-success" element={<GoogleCallback />} />
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
