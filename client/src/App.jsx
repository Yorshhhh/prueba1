import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
//PAGINAS
import HomePage from "./pages/HomePage";
import VerDepartamentosPage from "./pages/VerDepartamentosPage";
import RegisterPage from "./pages/RegisterPage";
import AgregarDeptosPage from "./pages/AgregarDeptosPage";
//COMPONENTES
import NavBar from "./components/NavBar";
import NotFound from "./components/NotFound";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/verDepartamentos" element={<VerDepartamentosPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/departamentos" element={<AgregarDeptosPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
