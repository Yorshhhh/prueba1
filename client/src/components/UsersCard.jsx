import React from "react";

function UsersCard({ user }) {
  return (
    <div className="bg-gray-800 text-white p-4 rounded-md">
      <a>ID: {user.id}</a>
      <h1 className="text-xl font-bold capitalize">RUT: {user.rut}</h1>
      <h2>Nombre completo: {user.nombre_completo}</h2>
      <h2>Numero de Telefono: {user.numero_telefono}</h2>
      <h2>Correo: {user.correo}</h2>
    </div>
  );
}

export default UsersCard;
