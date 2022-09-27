import React, { FC, useEffect } from "react";
import { useAppSelector } from "../../hooks/hooks";
import { ITodo } from "../../models/ITodo";
import TodoItem from "../TodoItem/TodoItem";
import s from "./TodoList.module.scss";

const TodoList: FC = () => {
  const todos = useAppSelector((state) => state.todos.todos);
  const filtValue = useAppSelector((state) => state.todos.filtValue);

  enum Сondition {
    active,
    completed,
  }

  const todoBlock = todos
    .filter((todo: ITodo) =>
      filtValue === Сondition[0] ? !todo.completed : filtValue === Сondition[1] ? todo.completed : todo
    )
    .map((todo: ITodo) => {
      return <TodoItem key={todo.id} {...todo} />;
    });

  console.log(todos.length);
  return (
    <div className={s.todoList}>
      <div>
        <h1>Todo List</h1>
      </div>
      <div className={s.todoList_scrollBox}>
        {filtValue === Сondition[1] && todoBlock.length === 0 && <p>there is nothing here, add first</p>}
        <ul>{todoBlock}</ul>
      </div>
    </div>
  );
};

export default TodoList;
