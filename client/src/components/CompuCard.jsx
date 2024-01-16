function CompuCard({ compu }) {
  return (
    <div className="bg-gray-800 text-white p-4 rounded-md">
      <a>ID: {compu.id}</a>

      <h1 className="text-xl fond-bold capitalize">
        Nombre: {compu.nombre}
      </h1>

      <h1 className="text-xl fond-bold capitalize">
        Descripcion: {compu.descripcion}
      </h1>

      <h2 className="text-gray-500 text-sm text-center">
        Stock: ${compu.stock}
      </h2>

      <h2 className="text-gray-500 text-sm text-center">
        Precio: {compu.precio}
      </h2>
    </div>
  );
}

export default CompuCard;
