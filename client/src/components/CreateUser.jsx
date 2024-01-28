import React, { useState } from "react";
import { useAuth } from "../context/Context";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserForm() {
  const [rut, setRut] = useState("");
  const [dv, setDV] = useState("");

  const [password, setPassword] = useState("");
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [fecha_nacimiento, setFechaNacimiento] = useState("");
  const [numero_telefono, setNumeroTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [cod_rol, setRol] = useState(0);

  const { setIsAuthenticated } = useAuth();

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
      cod_rol,
    };

    //Implementacion POST
    try {
      const token = localStorage.getItem("token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await fetch(
        "http://localhost:5001/users/crear-usuario",
        {
          method: "POST",
          headers,
          body: JSON.stringify(newUser),
        }
      );
      if (!response.ok) {
        toast.error("Error desde el servidor");
      } else {
        toast.success("Usuario creado con éxito", { autoClose: 5000 }); // AutoCerrar después de 5000 milisegundos (5 segundos)
        // Reiniciar los estados después de una respuesta exitosa
        setRut("");
        setDV("");
        setPassword("");
        setNombres("");
        setApellidos("");
        setFechaNacimiento("");
        setNumeroTelefono("");
        setCorreo("");
        setRol(0);
      }
    } catch (error) {
      toast.error("Error en método POST", { autoClose: 5000 });
      console.error("Error en metodo POST: ", error);
    }
  };
  return (
    <div className="max-w-md mx-auto">
      <h1>Formulario Crear Usuario</h1>
      <form
        action=""
        className="bg-slate-500 p-5 mb-4"
        onSubmit={handdleSubmit}
      >
        <input
          type="text"
          placeholder="Ingresa el rut del usuario"
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
          placeholder="Ingresa el digito verificador del usuario"
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
          placeholder="Ingresa los nombres del usuario"
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
          placeholder="Ingresa los apellidos del usuario"
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
          placeholder="Ingresa la fecha de nacimiento del usuario"
          onChange={(e) => {
            setFechaNacimiento(e.target.value);
          }}
          value={fecha_nacimiento}
          className="bg-slate-300 px-3 w-full mb-2"
        />
        <input
          type="tel"
          placeholder="Ingresa el numero de telefono del usuario"
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
          placeholder="Ingresa un correo para el usuario"
          onChange={(e) => {
            setCorreo(e.target.value);
          }}
          value={correo}
          className="bg-slate-300 px-3 w-full mb-2"
        />
        <input
          type="password"
          placeholder="Ingresa su contraseña"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          required
          className="bg-slate-300 px-3 w-full mb-2"
        />
        <label>Codigo de los roles de usuario: </label>
        <select
          name="rol_usuario"
          id="rol_usuario"
          onChange={(e) => {
            const selectedValue = e.target.value;

            // Validar que solo se seleccionen los valores permitidos
            if (selectedValue === "1" || selectedValue === "2") {
              setRol(selectedValue);
            } else {
              // Notificar al usuario que solo se permiten los valores 1 y 2
              alert(
                "Por favor, selecciona un rol válido (1 para admin, 2 para técnico)"
              );
            }
          }}
          required
          value={cod_rol}
        >
          <option value="1">admin</option>
          <option value="2">tecnico</option>
        </select>
        <button className="bg-indigo-500 px-3 py-1 hover:bg-indigo-400 text-white rounded-md mt-2">
          Crear Usuario
        </button>
      </form>
    </div>
  );
}

export default UserForm;
