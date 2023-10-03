import React, { createContext, useState } from "react";

export const Context = createContext();

export function ContextProvider(props) {
  const [users, setUsers] = useState([]);

  function createUsers(user) {
    const newUser = {
      id: users.length+1,
      rut: user.rut,
      password: user.password,
    };
    setUsers((prevUsers) => [...prevUsers, newUser]);
  }
  return (
    <Context.Provider value={{ users, createUsers }}>
      {props.children}
    </Context.Provider>
  );
}
