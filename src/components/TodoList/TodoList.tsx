import React, { FC } from "react";
import { useAppSelector } from "../../hooks/hooks";
import { ITodo } from "../../models/ITodo";
import TodoItem from "../TodoItem/TodoItem";
import s from "./TodoList.module.scss";

const TodoList: FC = () => {
  const todos = useAppSelector((state) => state.todos.todos);

  return (
    <div className={s.todoList}>
      <div>
        <h1>Todo List</h1>
      </div>
      <div className={s.todoList_scrollBox}>
        <ul>
          {todos.map((todo: ITodo) => {
            return <TodoItem key={todo.id} {...todo} />;
          })}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
