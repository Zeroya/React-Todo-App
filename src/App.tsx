import React, { FC } from "react";
import TodoHeader from "./pages/TodoHeader/TodoHeader";
import TodoList from "./pages/TodoList/TodoList";
import "./App.css";
import TodoButtons from "./pages/TodoButtons/TodoButtons";

const App: FC = () => {
  return (
    <div className="App">
      <TodoHeader />
      <TodoList />
      <TodoButtons />
    </div>
  );
};

export default App;
