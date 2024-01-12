import React, { createContext, useState, useContext, useEffect } from "react";

export const Context = createContext();

export const useAuth = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un Provider");
  }
  return context;
};

export function ContextProvider(props) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      //SE VERIFICA SI EXISTE UN TOKEN
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("no existe un token");
        setIsAuthenticated(false);
        setIsAdmin(false);
        return;
      }
      try {
        const response = await fetch("http://localhost:5001/auth/verifytoken", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        //VERIFICA SI SE OBTUVO UNA RESPUESTA DEL SERVIDOR
        if (!response.ok) {
          throw new Error("Error al intentar verificar el Token");
        } else {
          setIsAuthenticated(true);
          console.log("Parece que funciono");
        }
      } catch (error) {
        setIsAuthenticated(false);
        console.error("Error en el metodo POST: ", error);
      }
    };
    checkLogin();
  }, []);

  return (
    <Context.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        isAdmin,
        setIsAdmin,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}
