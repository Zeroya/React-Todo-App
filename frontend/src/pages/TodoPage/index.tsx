import React, { FC } from "react";
import TodoHeader from "../../components/TodoHeader/TodoHeader";
import TodoList from "../../components/TodoList/TodoList";
import TodoButtons from "../../components/TodoButtons/TodoButtons";
import NavBar from "../../components/NavBar";

const TodoPage: FC = () => {
  return (
    <>
      <NavBar />
      <TodoHeader />
      <TodoList />
      <TodoButtons />
    </>
  );
};

export default TodoPage;
