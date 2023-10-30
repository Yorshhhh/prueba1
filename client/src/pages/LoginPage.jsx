import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  const history = useNavigate();

  const handdleSubmit = async (e) => {
    e.preventDefault();

    const userLogin = {
      correo,
      password,
    };
    //Implementacion POST
    try {
      const response = await fetch("http://localhost:5001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userLogin),
      });
      const data = await response.json();

      if (response.ok) {
        const userRole = data.user.rol;
        const token = data.token
        localStorage.setItem("token", token)
        
        if (userRole === "user") {
          console.log("Usuario autenticado correctamente!!!");
          history("/dashboard");
        } else if (userRole === "admin") {
          console.log("Admin autenticado correctamente!!!");
          history("/admin");
        } else {
          console.error("Usuario autenticado, pero rol no reconocido");
        }
      } else {
        alert("Error en el LOGIN: "+data.message)
      }
    } catch (e) {
      console.error("Error en metodo POST: ", e);
    }
  };
  return (
    <div className="max-w-md mx-auto container mt-2 mb-2 bg-teal-500 p-5">
      <h1>Login</h1>
      <form
        action=""
        className="bg-slate-500 p-5 mb-4"
        onSubmit={handdleSubmit}
      >
        <input
          type="text"
          placeholder="Ingresa tu correo"
          onChange={(e) => {
            setCorreo(e.target.value);
          }}
          value={correo}
          autoFocus
          required
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
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
