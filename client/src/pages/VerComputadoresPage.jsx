import React from "react";
import CompuList from '../components/CompuList'

function verDepartamentos() {
  return (
    <div className="container mt-2 mb-2 mx-auto bg-blue-500 p-5">
      <div className="bg-yellow-500 mx-auto">
        <h1>Lista de computadores</h1>
        <CompuList />
      </div>
    </div>
  );
}

export default verDepartamentos;
