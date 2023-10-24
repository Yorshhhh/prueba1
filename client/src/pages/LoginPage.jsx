import React, { useState } from "react";

function LoginPage() {
  const [rut, setRut] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="max-w-md mx-auto container mt-2 mb-2 bg-teal-500 p-5">
      <h1>Login</h1>
      <form
        action=""
        className="bg-slate-500 p-5 mb-4"
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
