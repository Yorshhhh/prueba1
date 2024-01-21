import React, { useState } from "react";

function PiezasForm() {
  const [nombre_producto, setNombreProducto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [marca, setMarca] = useState("");
  const [cantidad, setCantidad] = useState(0);

  const handdleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = {
      nombre_producto,
      descripcion,
      marca,
      cantidad,
    };
  };

  return (
    <form className="max-w-md mx-auto" onSubmit={handdleSubmit}>
      <input
        type="text"
        placeholder="Ingrese nombre del producto"
        onChange={(e) => {
          setNombreProducto(e.target.value);
        }}
        value={nombre_producto}
        className="bg-slate-300 px-3 w-full mb-2"
      />
      <input
        type="text"
        placeholder="Ingrese descripcion"
        onChange={(e) => {
          setDescripcion(e.target.value);
        }}
        value={descripcion}
        className="bg-slate-300 px-3 w-full mb-2"
      />
      <input
        type="text"
        placeholder="Ingrese marca"
        onChange={(e) => {
          setMarca(e.target.value);
        }}
        value={marca}
        className="bg-slate-300 px-3 w-full mb-2"
      />
      <input
        type="number"
        placeholder="Ingrese cantidad"
        onChange={(e) => {
          // Utiliza una expresión regular para permitir solo dígitos y limitar la longitud a 8
          const validatedValue = e.target.value.replace(/\D/g, "");
          setCantidad(validatedValue);
        }}
        value={cantidad}
        className="bg-slate-300 px-3 w-full mb-2"
      />
      <button className="bg-indigo-500 px-3 py-1 hover:bg-indigo-400 text-white rounded-md mt-2">
        Agregar Pieza
      </button>
    </form>
  );
}

export default PiezasForm;
