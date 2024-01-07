import React, { useContext, useState, useEffect } from "react";
import UsersCard from "../components/UsersCard";
import { Context } from "../context/Context.jsx";

function UsersList() {
  const { users } = useContext(Context);
  const [infoBackend, setInfoBackend] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        const response = await fetch("http://localhost:5001/users", {
          method: "GET",
          headers,
        });

        if (!response.ok) {
          throw new Error("Error al obtener la lista de usuarios");
        }

        const data = await response.json();
        setInfoBackend(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
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
