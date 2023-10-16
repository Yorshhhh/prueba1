import React from "react";
import UserForm from "../components/UserForm";
import UsersList from "../components/UsersList";

function RegisterPage() {
  return (
    <div className="container mt-2 mb-2 mx-auto bg-teal-500 p-5">
      <h1>Registrate</h1>
      <UserForm />

      <div className="bg-yellow-500 mx-auto">
        <h1>Lista de Usuarios</h1>
        <UsersList />
      </div>
    </div>
  );
}

export default RegisterPage;
