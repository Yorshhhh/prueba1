import React, { useState, useEffect } from "react";

function About() {
  const [infoBackend, setInfoBackend] = useState([]); // Inicializa infoBackend como un objeto vacío con una propiedad 'users' que es una matriz vacía

  useEffect(() => {
    fetch("http://localhost:5001/about")
      .then((response) => response.json())
      .then((data) => {
        setInfoBackend(data);
      });
  }, []);

  return (
    <div className="container mt-2 mb-2 mx-auto bg-blue-500 p-5">
      <div className="container mt-2 mb-2 mx-auto bg-gray-500 p-5">
        <h1>Info Departamentos</h1>

        {infoBackend.departamentos && infoBackend.departamentos.length > 0 ? (
          <ul>
          {infoBackend.departamentos.map((departamento, index) => (
            <li key={index}>
              <p>ID: {departamento.id}</p>
              <p>Nombre: {departamento.nombre}</p>
              <p>Capacidad: {departamento.capacidad_depto}</p>
              <p>Descripción: {departamento.descripcion}</p>
              <p>Precio: {departamento.precio}</p>
              <br/>
            </li>
          ))}
        </ul>
        ) : (
          <p>Cargando información...</p>
        )}
      </div>
{/*       <h1>Este es el about</h1>
      <h2>
        Replicaremos el comportamiento del Home, pero recibiremos los datos en
        una Users CARD, contenida en una Users List
      </h2>
      <h1>Info Departamentos</h1>
      {infoBackend.departamentos && infoBackend.departamentos.length > 0 ? (
        <ul>
          {infoBackend.departamentos.map((depto, i) => (
            <div key={i}>
              <h1>{depto}</h1>
            </div>
          ))}
        </ul>
      ) : (
        <p>Cargando información...</p>
      )} */}
    </div>
  );
}

export default About;
