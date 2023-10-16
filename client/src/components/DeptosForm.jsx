import React, { useState, useEffect } from "react";

function DeptosForm() {
  const [capacidad, setCapacidad] = useState("");
  const [disponibilidad, setDisponibilidad] = useState("");
  const [direccion, setDireccion] = useState("");
  const [habitaciones, setHabitaciones] = useState("");
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const handdleSubmit = async (e) => {
    const newDepto = {
      capacidad,
      disponibilidad,
      direccion,
      habitaciones,
      precio,
      descripcion,
    };
    //Implementacion POST
    try {
      const response = await fetch("http://localhost:5001/departamentos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDepto),
      });
      if (response.ok) {
        console.log("Departamento agregado exitosamente!");
        setCapacidad("");
        setDisponibilidad("");
        setDireccion("");
        setHabitaciones("");
        setPrecio("");
        setDescripcion("");
      } else {
        console.error("Error al registrar departamento");
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
          placeholder="Ingresa la capacidad del departamento"
          onChange={(e) => {
            setCapacidad(e.target.value);
          }}
          value={capacidad}
          autoFocus
          className="bg-slate-300 px-3 w-full mb-2"
        />
        <input
          type="text"
          placeholder="Disponibilidad (?)"
          onChange={(e) => {
            setDisponibilidad(e.target.value);
          }}
          value={disponibilidad}
          className="bg-slate-300 px-3 w-full mb-2"
        />
        <input
          type="tel"
          placeholder="Ingresa un numero de telefono"
          onChange={(e) => {
            setDireccion(e.target.value);
          }}
          value={direccion}
          className="bg-slate-300 px-3 w-full mb-2"
        />
        <input
          type="text"
          placeholder="Numero de Habitaciones"
          onChange={(e) => {
            setHabitaciones(e.target.value);
          }}
          value={habitaciones}
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
        <input
          type="text"
          placeholder="Ingresa una descripcion"
          onChange={(e) => {
            setDescripcion(e.target.value);
          }}
          value={descripcion}
          className="bg-slate-300 px-3 w-full mb-2"
        />
        <button className="bg-indigo-500 px-3 py-1 hover:bg-indigo-400 text-white rounded-md mt-2">
          Registrar
        </button>
      </form>
    </div>
  );
}

export default DeptosForm;
