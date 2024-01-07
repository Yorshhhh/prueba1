import PerfilUsuario from '../components/PerfilUsuario'
import UsersList from "../components/UsersList";

function AdminPage() {
  return (
    <div className="bg-yellow-500 mx-auto">
      <h1>Info del usuario</h1>
      <PerfilUsuario />
      <h1>Lista de Usuarios</h1>
      <UsersList />
    </div>
  );
}

export default AdminPage;
