import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./routes/Home";
import { TodoContextProvider } from "./context/TodoContext";

export const App = () => {
  return (
    <TodoContextProvider>
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
    </TodoContextProvider>
  );
};
