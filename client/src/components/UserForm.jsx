import React,{useContext, useState} from "react";
import {Context} from '../context/Context'

function UserForm() {
  const [rut,setRut] = useState("")
  const [password,setPassword] = useState("")
  
  const {createUsers} = useContext(Context)

  const handdleSubmit = (e) => {
    e.preventDefault()

    createUsers({rut,password})

    setRut("")
    setPassword("")
  } 
  return (
    <div className="max-w-md mx-auto">
      <h1>Formulario Registrar Usuario</h1>
      <form action="" className="bg-slate-500 p-5 mb-4" onSubmit={handdleSubmit}>
        <input
          type="text"
          placeholder="Ingresa tu rut"
          onChange={(e) =>{
            setRut(e.target.value)
          }}
          value={rut}
          autoFocus
          className="bg-slate-300 px-3 w-full mb-2"
        />
        <input type="password"
               placeholder="Ingresa tu contraseña"
               onChange={(e) =>{
                setPassword(e.target.value)
               }}
               value={password}
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
