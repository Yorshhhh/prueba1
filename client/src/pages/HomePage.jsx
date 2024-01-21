import React, { useEffect, useState } from "react";
function HomePage() {
/*   const [infoBackend, setInfoBackend] = useState([]); // Inicializa infoBackend como un objeto vacío con una propiedad 'users' que es una matriz vacía

  useEffect(() => {
    fetch("http://localhost:5001/home")
      .then((response) => response.json())
      .then((data) => {
        setInfoBackend(data);
      });
  }, []);
 */
  return (
    <div className="container mt-2 mb-2 mx-auto bg-teal-500 p-5">
      <div className="container mt-2 mb-2 mx-auto bg-blue-500 p-5">
        <h1>Bienvenido al home</h1>
 {/*        {infoBackend.usuarios && infoBackend.usuarios.length > 0 ? (
          <ul>
            {infoBackend.usuarios.map((user, i) => (
              <li key={i}>
                <p>Id: {user.id}</p>
                <p>Rut: {user.rut}</p>
                <p>Password: {user.password}</p>
                <br />
              </li>
            ))}
          </ul>
        ) : (
          <p>Cargando información...</p>
        )} */}

        <div className="container mt-2 mb-2 mx-auto bg-red-500 p-5">
          <h1>Agregar productos para vender</h1>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
