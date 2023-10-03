import React, { useEffect, useState } from "react";
import UserForm from "../components/UserForm";
import UsersList from "../components/UsersList";

function RegisterPage() {
  return (
    <div className="container mt-2 mb-2 mx-auto bg-teal-500 p-5">
      <h1>Registrate</h1>
      <UserForm />

      <div className="bg-yellow-500 mx-auto">
        <UsersList />
      </div>
    </div>
  );
}

export default RegisterPage;
