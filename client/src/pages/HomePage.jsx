import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function HomePage() {
  const showToast = () => {
    toast.success("Acabo de instalar react-toastify");
  };
  return (
    <div className="container mt-2 mb-2 mx-auto bg-teal-500 p-5">
      <div className="container mt-2 mb-2 mx-auto bg-blue-500 p-5">
        <button onClick={showToast}>Mostrar Toast</button>
        <h1>Bienvenido al home</h1>

        <div className="container mt-2 mb-2 mx-auto bg-red-500 p-5">
          <h1>Agregar productos para vender</h1>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
