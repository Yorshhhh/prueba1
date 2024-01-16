import { useState, useEffect } from "react";
import CompuCard from "../components/CompuCard";
function CompuList() {
  const  [infoBackend, setInfoBackend]  = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/computadores")
      .then((response) => response.json())
      .then((data) => {
        setInfoBackend(data);
      });
  }, []);

  if (infoBackend.length === 0) {
    return (
      <h1 className="text-white text-4xl font-bold text-center">
        No hay computadores agregados aún
      </h1>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-2 rounded-md">
      {infoBackend.map((compu) => (
        <CompuCard key={compu.id} compu={compu} />
      ))}
    </div>
  );
}

export default CompuList;
