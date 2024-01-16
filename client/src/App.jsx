import { Routes, Route } from "react-router-dom";
//PAGINAS
import HomePage from "./pages/HomePage";
import AgregarCompusPage from "./pages/AgregarCompusPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import AdminPage from "./pages/AdminPage";
import VerComputadoresPage from './pages/VerComputadoresPage'

//COMPONENTES
import NotFound from "./components/NotFound";

import "./App.css";
import Layout from "./components/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/*RUTAS PUBLICAS*/}
        <Route path="/" element={<HomePage />} />
        <Route path="/verComputadores" element={<VerComputadoresPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/*RUTAS PRIVADAS*/}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/computadores" element={<AgregarCompusPage />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
