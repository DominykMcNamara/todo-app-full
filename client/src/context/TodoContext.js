import React, { useState, createContext } from "react";

export const TodoContext = createContext();

export const TodoContextProvider = (props) => {
  const [todos, setTodos] = useState([]);
  const [numberOfIncompletedTodos, setNumberOfIncompletedTodos] = useState();
  const [filter, setFilter] = useState("active");
  const [colorMode, setColorMode] = useState(" ");

  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
        numberOfIncompletedTodos,
        setNumberOfIncompletedTodos,
        filter,
        setFilter,
        colorMode,
        setColorMode,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};
