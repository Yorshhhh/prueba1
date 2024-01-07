import React, { useContext, useState } from "react";
import { useAuth } from "../context/Context";
import { useNavigate } from "react-router-dom";



function UserForm() {
  const [rut, setRut] = useState("");
  const [password, setPassword] = useState("");
  const [nombre_completo,setNombreCompleto] = useState("")
  const [numero_telefono,setNumeroTelefono] = useState("")
  const [correo,setCorreo] = useState("")
  const { setIsAuthenticated } = useAuth()

  
  const history = useNavigate();

  const handdleSubmit = async (e) => {
    e.preventDefault()

    const newUser = {
      rut,
      nombre_completo,
      numero_telefono,
      correo,
      password,
    };
    //Implementacion POST
    try {
      const response = await fetch("http://localhost:5001/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      const data = await response.json()

      if (response.ok) {
        console.log('que tiene el token: ', data.token)
        const token = data.token
        setIsAuthenticated(true)

        localStorage.setItem("token", token)
  
        history("/dashboard")
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
          value={nombre_completo}
          className="bg-slate-300 px-3 w-full mb-2"
        />
         <input
          type="tel"
          placeholder="Ingresa un numero de telefono"
          onChange={(e) => {
            setNumeroTelefono(e.target.value);
          }}
          value={numero_telefono}
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
