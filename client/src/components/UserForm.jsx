import React, { useContext, useState } from "react";
import { Context } from "../context/Context";

function UserForm() {
  const [rut, setRut] = useState("");
  const [password, setPassword] = useState("");
  const [nombreCompleto,setNombreCompleto] = useState("")
  const [numeroTelefono,setNumeroTelefono] = useState("")
  const [correo,setCorreo] = useState("")

  const { createUsers } = useContext(Context);

  const handdleSubmit = async (e) => {
    const newUser = {
      rut,
      nombreCompleto,
      numeroTelefono,
      correo,
      password,
    };
    //Implementacion POST
    try {
      const response = await fetch("http://localhost:5001/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      if (response.ok) {
        console.log("Usuario creado exitosamente!");
        setRut("");
        setNombreCompleto("")
        setNumeroTelefono("")
        setCorreo("")
        setPassword("");
      } else {
        console.error("Error al registrar usuario");
      }
    } catch (e) {
      console.error("Error en metodo POST: ", e);
    }
  };
  return (
    <div className="max-w-md mx-auto">
      <h1>Formulario Registrar Usuario</h1>
      <form
        action=""
        className="bg-slate-500 p-5 mb-4"
        onSubmit={handdleSubmit}
      >
        <input
          type="text"
          placeholder="Ingresa tu rut"
          onChange={(e) => {
            setRut(e.target.value);
          }}
          value={rut}
          autoFocus
          required
          className="bg-slate-300 px-3 w-full mb-2"
        />
        <input
          type="text"
          placeholder="Ingresa tu nombre completo"
          onChange={(e) => {
            setNombreCompleto(e.target.value);
          }}
          value={nombreCompleto}
          className="bg-slate-300 px-3 w-full mb-2"
        />
         <input
          type="tel"
          placeholder="Ingresa un numero de telefono"
          onChange={(e) => {
            setNumeroTelefono(e.target.value);
          }}
          value={numeroTelefono}
          className="bg-slate-300 px-3 w-full mb-2"
        />
         <input
          type="email"
          placeholder="Ingresa un correo"
          onChange={(e) => {
            setCorreo(e.target.value);
          }}
          value={correo}
          className="bg-slate-300 px-3 w-full mb-2"
        />
        <input
          type="password"
          placeholder="Ingresa tu contraseña"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          required
          className="bg-slate-300 px-3 w-full mb-2"
        />
        <button className="bg-indigo-500 px-3 py-1 hover:bg-indigo-400 text-white rounded-md mt-2">
          Registrar
        </button>
      </form>
    </div>
  );
}

export default UserForm;
