import { useState, useEffect } from "react";
import PiezasForm from "../components/PiezasForm";

function TecnicoPage() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [listaComponentes, setListaComponentes] = useState([]);
  const [listaComputadores, setListaComputadores] = useState([]);
  const [error, setError] = useState(null);

  const handleClickForm = () => {
    setMostrarFormulario(!mostrarFormulario);
  };

  //FETCH PARA OBTENER LISTA DE COMPUTADORES
  useEffect(() => {
    const fetchComputadores = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        const response = await fetch(
          "http://localhost:5001/tecnico/get-computadores",
          {
            method: "GET",
            headers,
          }
        );

        if (!response.ok) {
          throw new Error("Error al obtener la lista de computadores");
        }

        const data = await response.json();
        setListaComputadores(data.data); // Supongo que los datos están en la propiedad 'data'
      } catch (error) {
        setError(error.message);
      }
    };

    fetchComputadores();
  }, []);

  //FETCH PARA OBTENER LISTA DE COMPONENTES
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        const response = await fetch(
          "http://localhost:5001/tecnico/get-componentes",
          {
            method: "GET",
            headers,
          }
        );

        if (!response.ok) {
          throw new Error("Error al obtener la lista de componentes");
        }

        const data = await response.json();
        setListaComponentes(data.data); // Supongo que los datos están en la propiedad 'data'
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Perfil Usuario Tecnico</h1>
      <button
        onClick={handleClickForm}
        className="bg-indigo-500 px-3 py-1 hover:bg-indigo-400 text-white rounded-md mt-2"
      >
        Agregar Componentes
      </button>
      {mostrarFormulario && <PiezasForm />}

      {/* LISTA DE COMPONENTES DISPONIBLES */}
      <div className="flex justify-center items-center">
        <div className="w-full max-w-md">
          <h1 className="text-center mb-4">Lista de Componentes Disponibles</h1>
          <ul>
            {listaComponentes.map((componente, index) => (
              <li
                key={componente.num_componente}
                className="bg-gray-200 p-2 mb-2 rounded"
              >
                {index + 1}. {componente.descripcion}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/*LISTA DE COMPUTADORES DISPONIBLES*/}
      <div className="flex justify-center items-center">
        <div className="w-full max-w-md">
          <h1 className="text-center mb-4">
            Lista de Computadores Disponibles
          </h1>
          <ul>
            {listaComputadores.map((computador, index) => (
              <li
                className="bg-gray-200 p-2 mb-2 rounded"
                key={computador.cod_pc}
              >
                <p>{index + 1}. Computador</p>
                <p>Descripción: {computador.descripcion}</p>
                <p>Precio: ${computador.precio}</p>
                <br />
                {/* Agrega más elementos según los atributos que quieras mostrar */}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TecnicoPage;
