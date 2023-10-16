import React from "react";
import DeptosForm from '../components/DeptosForm'
import DeptoList from '../components/DeptoList'

function AgregarDeptosPage() {
  return (
    <div className="container mt-2 mb-2 mx-auto bg-teal-500 p-5">
      <div className="bg-blue-500 mx-auto">
        <h1>Agrega un Departamento</h1>
        <DeptosForm />
      </div>
      <div className="bg-yellow-500 mx-auto">
        <h1>Lista de Departamentos</h1>
        <DeptoList />
      </div>
    </div>
  );
}

export default AgregarDeptosPage;
