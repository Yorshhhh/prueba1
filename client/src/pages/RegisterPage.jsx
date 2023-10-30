import React from "react";
import UserForm from "../components/UserForm";

function RegisterPage() {
  return (
    <div className="container mt-2 mb-2 mx-auto bg-teal-500 p-5">
      <h1>Registrate</h1>
      <UserForm />
    </div>
  );
}

export default RegisterPage;