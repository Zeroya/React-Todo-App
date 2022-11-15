import React, { FC } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useAppSelector } from "./hooks/hooks";
import { useRoutes } from "./hooks/routes";
import "./App.css";

const App: FC = () => {
  const jwtToken = useAppSelector((state) => state.todos.jwtToken);
  const routes = useRoutes(!!jwtToken);
  return (
    <Router>
      <div className="App">{routes}</div>
    </Router>
  );
};

export default App;
