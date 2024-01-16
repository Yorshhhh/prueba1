import React from "react";
import ReactDOM from "react-dom/client";
import {
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";

import NavBar from '../src/components/NavBar.jsx'

import App from "./App.jsx";
import "./index.css";
//IMPORTAMOS EL CONTEXT
import { ContextProvider } from "./context/Context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ContextProvider>
        <NavBar />
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </ContextProvider>
    </BrowserRouter>

  </React.StrictMode>
);
