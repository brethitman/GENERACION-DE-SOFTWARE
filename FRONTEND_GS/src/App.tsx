import { Route, Routes } from "react-router-dom";

import RutaPrivada from "./components/RutaPrivada/RutaPrivada";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import Users from "./pages/Users/Users";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/usuarios"
          element={
            <RutaPrivada>
              <Users />
            </RutaPrivada>
          }
        />
      </Route>
    </Routes>
  );
}
