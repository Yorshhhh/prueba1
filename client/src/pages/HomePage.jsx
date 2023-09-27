import React,{useEffect,useState} from "react";
function HomePage() {
  const [infoBackend, setInfoBackend] = useState([]); // Inicializa infoBackend como un objeto vacío con una propiedad 'users' que es una matriz vacía

  useEffect(() => {
    fetch("http://localhost:5001/home")
      .then((response) => response.json())
      .then((data) => {
        setInfoBackend(data);
      });
  }, []);

  return (
    <div>
      <h1>Esta es la home page!</h1>
      <div>
        <h1>Info Usuarios</h1>
        {infoBackend.users && infoBackend.users.length > 0 ? (
          <ul>
            {infoBackend.users.map((user, i) => (
              <li key={i}>{user}</li>
            ))}
          </ul>
        ) : (
          <p>Cargando información...</p>
        )}

        <div>
          <h1>que sucede?</h1>
          <p>si agrego otro div</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
