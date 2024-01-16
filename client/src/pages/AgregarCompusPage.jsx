import React from "react";
import CompuForm from '../components/CompuForm'
import CompuList from '../components/CompuList'

function AgregarDeptosPage() {
  return (
    <div className="container mt-2 mb-2 mx-auto bg-teal-500 p-5">
      <div className="bg-blue-500 mx-auto">
        <h1>Agrega un Computador</h1>
        <CompuForm />
      </div>
      <div className="bg-yellow-500 mx-auto">
        <h1>Lista de Computadores</h1>
        <CompuList />
      </div>
    </div>
  );
}

export default AgregarDeptosPage;
