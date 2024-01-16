import { useState, useEffect } from "react";

function CompuForm() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [stock, setStock] = useState("")
  const [precio, setPrecio] = useState("");
  

  const handdleSubmit = async (e) => {
    const newComputador = {
      nombre,
      descripcion,
      stock,
      precio,
    };
    //Implementacion POST
    try {
      const response = await fetch("http://localhost:5001/departamentos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newComputador),
      });
      if (response.ok) {
        setNombre("")
        setDescripcion("");
        setStock("")
        setPrecio("");
      } else {
        console.error("Error al registrar computador");
      }
    } catch (e) {
      console.error("Error en metodo POST: ", e);
    }
  };
  return (
    <div className="max-w-md mx-auto">
      <form
        action=""
        className="bg-slate-500 p-5 mb-4"
        onSubmit={handdleSubmit}
      >
        <input
          type="text"
          placeholder="Nombre del producto"
          onChange={(e) => {
            setNombre(e.target.value);
          }}
          value={nombre}
          autoFocus
          className="bg-slate-300 px-3 w-full mb-2"
        />
        <input
          type="text"
          placeholder="Descripcion del producto"
          onChange={(e) => {
            setDescripcion(e.target.value);
          }}
          value={descripcion}
          className="bg-slate-300 px-3 w-full mb-2"
        />

        <input
          type="text"
          placeholder="Stock"
          onChange={(e) => {
            setStock(e.target.value);
          }}
          value={stock}
          className="bg-slate-300 px-3 w-full mb-2"
        />
        <input
          type="text"
          placeholder="Ingresa el precio"
          onChange={(e) => {
            setPrecio(e.target.value);
          }}
          value={precio}
          className="bg-slate-300 px-3 w-full mb-2"
        />
        <button className="bg-indigo-500 px-3 py-1 hover:bg-indigo-400 text-white rounded-md mt-2">
          Registrar
        </button>
      </form>
    </div>
  );
}

export default CompuForm;
