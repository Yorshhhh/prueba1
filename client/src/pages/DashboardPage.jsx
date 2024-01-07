import PerfilUsuario from "../components/PerfilUsuario";

function DashboardPage() {
  return (
    <div>
      <h1>Solo llegas aquí si te has logeado con éxito y eres user</h1> 
      <PerfilUsuario />
    </div>
  );
}

export default DashboardPage;
