import React from "react";
import DeptoList from '../components/DeptoList'

function verDepartamentos() {
  return (
    <div className="container mt-2 mb-2 mx-auto bg-blue-500 p-5">
      <div className="bg-yellow-500 mx-auto">
        <h1>Lista de Departamentos</h1>
        <DeptoList />
      </div>
    </div>
  );
}

export default verDepartamentos;
