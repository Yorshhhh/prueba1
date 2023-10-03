import React, { useContext, useState, useEffect } from "react";
import UsersCard from "../components/UsersCard";
import { Context } from "../context/Context.jsx";

function UsersList() {
  const { users } = useContext(Context);
  const [infoBackend, setInfoBackend] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/register")
      .then((response) => response.json())
      .then((data) => {
        setInfoBackend(data);
      });

    
  }, []);

  if (infoBackend.length === 0) {
    return (
      <h1 className="text-white text-4xl font-bold text-center">
        No hay usuarios registrados aún
      </h1>
    );
  }
  return (
    <div>
      <div>
        <h1>Info desde el Backend</h1>
        {infoBackend.usuarios && infoBackend.usuarios.length > 0 ? (
          <ul>
            {infoBackend.usuarios.map((usuario, i) => (
              <li key={i}>
                <p>Id: {usuario.id}</p>
                <p>Rut: {usuario.rut}</p>
                <p>Password: {usuario.password}</p>
                <br />
              </li>
            ))}
          </ul>
        ) : (
          <p>Cargando informacion...</p>
          
        )}
      </div>
      <br />
      <h1>Lista de usuarios</h1>
      <div className="grid grid-cols-4 gap-2 rounded-md">
        {infoBackend.usuarios.map((user) => (
          <UsersCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}

export default UsersList;
