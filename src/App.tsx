import React, { FC } from "react";
import TodoHeader from "./components/TodoHeader/TodoHeader";
import TodoList from "./components/TodoList/TodoList";
import "./App.css";
import TodoButtons from "./components/TodoButtons/TodoButtons";

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
