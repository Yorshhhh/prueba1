import {useState} from "react";
import PiezasForm from "../components/PiezasForm";

function TecnicoPage() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false)

  const handleClickForm = () => {
    setMostrarFormulario(!mostrarFormulario)
  }
  return (
    <div>
      TecnicoPage
      <button onClick={handleClickForm} className="bg-indigo-500 px-3 py-1 hover:bg-indigo-400 text-white rounded-md mt-2">Agregar Componentes</button>
      {mostrarFormulario && <PiezasForm />}
      
    </div>
  );
}

export default TecnicoPage;
