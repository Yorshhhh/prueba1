import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Context";

function LoginPage() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser, setIsAuthenticated, isAdmin, setIsAdmin } = useAuth();

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
        //INFORMACION DEL USUARIO
        console.log("Informe del usuario: ", data.user);

        const userInfo = data.user;
        console.log("Info del usuario almacenado: ", userInfo);

        //GUARDAR LA INFORMACION DEL USUARIO
        localStorage.setItem("usuario", JSON.stringify(userInfo));

        //ROL DEL USUARIO
        const userRole = data.user.cod_rol;
        console.log("Rol de usuario: ", userRole);

        //ROL DEL USUARIO 2
        console.log("Rol del usuario desestructurado: ", userInfo.cod_rol);

        //INFORMACION DEL TOKEN
        const token = data.token;
        console.log("Token del usuario: ", token);
        setIsAuthenticated(true);
        //GUARDAR TOKEN
        localStorage.setItem("token", token);

        if (userRole === 3) {
          console.log("Usuario autenticado correctamente!!!");
          history("/dashboard");
        } else if (userRole === 1) {
          setIsAdmin(true);
          console.log("Admin autenticado correctamente!!!");
          history("/admin");
        } else if (userRole === 2) {
          console.log("Tecnico autenticado correctamente!!!");
          history("/tecnico");
        } else {
          console.error("Usuario autenticado, pero rol no reconocido");
        }
      } else {
        alert("Error en el LOGIN: " + data.message);
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
