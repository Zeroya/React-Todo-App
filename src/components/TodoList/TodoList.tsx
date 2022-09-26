import React, { FC, useEffect } from "react";
import { useAppSelector } from "../../hooks/hooks";
import { ITodo } from "../../models/ITodo";
import TodoItem from "../TodoItem/TodoItem";
import s from "./TodoList.module.scss";

const TodoList: FC = () => {
  const todos = useAppSelector((state) => state.todos.todos);
  const filtValue = useAppSelector((state) => state.todos.filtValue);

  return (
    <div className={s.todoList}>
      <div>
        <h1>Todo List</h1>
      </div>
      <div className={s.todoList_scrollBox}>
        <ul>
          {todos
            .filter((todo: ITodo) =>
              filtValue === "active"
                ? todo.completed === false
                : filtValue === "completed"
                ? todo.completed === true
                : todo
            )
            .map((todo: ITodo) => {
              return <TodoItem key={todo.id} {...todo} />;
            })}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
