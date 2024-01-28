import React, { useState } from "react";
import { useAuth } from "../context/Context";
import { useNavigate } from "react-router-dom";

function UserForm() {
  const [rut, setRut] = useState("");
  const [dv, setDV] = useState("");

  const [password, setPassword] = useState("");
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [fecha_nacimiento, setFechaNacimiento] = useState("");
  const [numero_telefono, setNumeroTelefono] = useState("");
  const [correo, setCorreo] = useState("");

  const { setIsAuthenticated } = useAuth();

  const history = useNavigate();

  const handdleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      rut,
      dv,
      nombres,
      apellidos,
      fecha_nacimiento,
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

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        const token = data.token;
        const user = data.user;
        setIsAuthenticated(true);

        localStorage.setItem("token", token);
        localStorage.setItem("usuario", JSON.stringify(user));
        history("/dashboard");
      } else {
        console.error("Error al registrar usuario");
      }
    } catch (error) {
      console.error("Error en metodo POST: ", error);
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
            // Utiliza una expresión regular para permitir solo dígitos y limitar la longitud a 8
            const validatedValue = e.target.value
              .replace(/\D/g, "")
              .slice(0, 8);
            setRut(validatedValue);
          }}
          value={rut}
          autoFocus
          required
          className="bg-slate-300 px-3 w-full mb-2"
        />
        <input
          type="text"
          placeholder="Digito verificador"
          onChange={(e) => {
            const inputValue = e.target.value;
            // Limitar la longitud máxima a 1
            if (inputValue.length <= 1) {
              // Verificar si la entrada es un número o "k" (mayúscula o minúscula)
              if (/^[0-9kK]$/.test(inputValue) || inputValue === "") {
                setDV(inputValue);
              }
            }
          }}
          value={dv}
          maxLength={1}
          required
          className="bg-slate-300 px-3 w-full mb-2"
        />

        <input
          type="text"
          placeholder="Ingresa tus nombres"
          onChange={(e) => {
            const inputValue = e.target.value;
            // Verificar si la entrada solo contiene caracteres
            if (!inputValue || /^[A-Za-z\s]+$/.test(inputValue)) {
              setNombres(inputValue);
            }
          }}
          value={nombres}
          className="bg-slate-300 px-3 w-full mb-2"
        />
        <input
          type="text"
          placeholder="Ingresa tus apellidos"
          onChange={(e) => {
            const inputValue = e.target.value;
            // Verificar si la entrada solo contiene caracteres
            if (!inputValue || /^[A-Za-z\s]+$/.test(inputValue)) {
              setApellidos(inputValue);
            }
          }}
          value={apellidos}
          className="bg-slate-300 px-3 w-full mb-2"
        />
        <a>Fecha de Nacimiento</a>
        <input
          type="date"
          placeholder="Ingresa tu fecha de nacimiento"
          onChange={(e) => {
            setFechaNacimiento(e.target.value);
          }}
          value={fecha_nacimiento}
          className="bg-slate-300 px-3 w-full mb-2"
        />
        <input
          type="tel"
          placeholder="Ingresa un numero de telefono"
          onChange={(e) => {
            const validatedValue = e.target.value
              .replace(/\D/g, "")
              .slice(0, 11);
            setNumeroTelefono(validatedValue);
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
