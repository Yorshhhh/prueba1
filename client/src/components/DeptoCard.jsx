import React from "react";

function DeptoCard({ depto }) {
  return (
    <div className="bg-gray-800 text-white p-4 rounded-md">
      <a>ID: {depto.id}</a>

      <h1 className="text-xl fond-bold capitalize">
        Capacidad: {depto.capacidad}
      </h1>

      <h1 className="text-xl fond-bold capitalize">
        Habitaciones: {depto.habitaciones}
      </h1>

      <h2 className="text-gray-500 text-sm text-center">
        Precio: ${depto.precio}
      </h2>

      <h2 className="text-gray-500 text-sm text-center">
        Descripcion: {depto.descripcion}
      </h2>
    </div>
  );
}

export default DeptoCard;
