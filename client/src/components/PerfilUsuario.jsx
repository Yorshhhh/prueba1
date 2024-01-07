function PerfilUsuario() {
  const user = JSON.parse(localStorage.getItem("usuario"));

  return (
    <div className="bg-gray-800 text-white p-4 rounded-md">
      <h1>Rut: {user.rut}</h1>
      <h1>Nombre: {user.nombre} </h1>
      <h2>Correo: {user.correo}</h2>
      <h2>Telefono: {user.telefono}</h2>
    </div>
  );
}

export default PerfilUsuario;
