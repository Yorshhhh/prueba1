import PerfilUsuario from "../components/PerfilUsuario";
import UsersList from "../components/UsersList";
import CreateUser from "../components/CreateUser";

function AdminPage() {
  return (
    <div className="bg-yellow-500 mx-auto">
      <h1>Info del usuario</h1>
      <PerfilUsuario />
      <br />
      <h1>Crear usuario</h1>
      <CreateUser />
      <br />
      <h1>Lista de Usuarios</h1>
      <UsersList />
    </div>
  );
}

export default AdminPage;
