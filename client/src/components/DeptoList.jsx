import React, { useState, useEffect } from "react";
import DeptoCard from "../components/DeptoCard";
function DeptoList() {
  const  [infoBackend, setInfoBackend]  = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/departamentos")
      .then((response) => response.json())
      .then((data) => {
        setInfoBackend(data);
      });
  }, []);

  if (infoBackend.length === 0) {
    return (
      <h1 className="text-white text-4xl font-bold text-center">
        No hay departamentos registrados aún
      </h1>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-2 rounded-md">
      {infoBackend.map((depto) => (
        <DeptoCard key={depto.id} depto={depto} />
      ))}
    </div>
  );
}

export default DeptoList;
