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

  useEffect(() => {
    /* const checkLogin = async () => {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const res = await verifyTokenRequest(cookies.token);
        console.log(res);
        if (!res.data) return setIsAuthenticated(false);
        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setLoading(false);
      }
    };
    checkLogin(); */

    const checkLogin = async () => {
      //SE VERIFICA SI EXISTE UN TOKEN
      const token = localStorage.getItem("token");

      if (!token) {
        console.log('no existe un token')
        setIsAuthenticated(false);
        return;
      }
      try {
        const response = await fetch("http://localhost:5001/auth/verifytoken", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        //VERIFICA SI SE OBTUVE UNA RESPUESTA DEL SERVIDOR
        if (!response.ok) {
          throw new Error("Error al intentar verificar el Token");
        }
        //VERIFICAMOS LA INFORMACION OBTENIDA
        
        setIsAuthenticated(true);
        console.log("Parece que funciono");
      } catch (error) {
        setIsAuthenticated(false);
        console.error("Error en el metodo POST: ", error);
      }
    };
    checkLogin();
  }, []);

  return (
    <Context.Provider
      value={{ user, setUser, isAuthenticated, setIsAuthenticated }}
    >
      {props.children}
    </Context.Provider>
  );
}
