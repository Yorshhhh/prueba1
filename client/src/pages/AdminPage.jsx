import React from "react";
import UsersList from "../components/UsersList";

function AdminPage() {
  return (
    <div className="bg-yellow-500 mx-auto">
      <h1>Lista de Usuarios</h1>
      <UsersList />
    </div>
  );
}

export default AdminPage;
