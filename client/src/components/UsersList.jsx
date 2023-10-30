import React, { useContext, useState, useEffect } from "react";
import UsersCard from "../components/UsersCard";
import { Context } from "../context/Context.jsx";

function UsersList() {
  const { users } = useContext(Context);
  const [infoBackend, setInfoBackend] = useState([]);

  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`, // Incluye el token en el encabezado de autorización
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    fetch("http://localhost:5001/users", {
      method: "GET", // Método GET para obtener la lista de usuarios
      headers, // Incluye el token en el encabezado de autorización
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error al obtener la lista de usuarios");
        }
      })
      .then((data) => {
        setInfoBackend(data);
      })
      .catch((error) => {
        console.error(error);
        // Aquí puedes manejar el error, como redirigir a una página de error o mostrar un mensaje al usuario
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
      <br />
      {
        <div className="grid grid-cols-4 gap-2 rounded-md">
          {infoBackend.map((user) => (
            <UsersCard key={user.id} user={user} />
          ))}
        </div>
      }
    </div>
  );
}

export default UsersList;
