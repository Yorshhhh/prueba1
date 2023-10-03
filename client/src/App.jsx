import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
//PAGINAS
import HomePage from "./pages/HomePage";
import About from './pages/About'
import RegisterPage from './pages/RegisterPage'
//COMPONENTES
import NavBar from "./components/NavBar";
import NotFound from './components/NotFound'


import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFound />}/> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
