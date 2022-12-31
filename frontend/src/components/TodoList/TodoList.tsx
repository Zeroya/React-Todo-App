import React, { FC, useMemo } from "react";
import { useAppSelector } from "../../hooks/hooks";
import { ITodo } from "../../models/ITodo";
import { Сondition } from "../../models/Enums";
import TodoItem from "../TodoItem/TodoItem";
import s from "./TodoList.module.scss";

const TodoList: FC = () => {
  const todos = useAppSelector((state) => state.todos.todos);
  const filtValue = useAppSelector((state) => state.todos.filtValue);
  const searchedValue = useAppSelector((state) => state.todos.searchValue);

  let todoBlock = todos
    .filter((todo: ITodo) =>
      !filtValue?.localeCompare(Сondition.active)
        ? !todo.completed
        : !filtValue.localeCompare(Сondition.completed)
        ? todo.completed
        : todo
    )
    .filter((el: ITodo) => {
      return searchedValue.trim() ? el.message.toLowerCase().includes(searchedValue.trim().toLowerCase()) : el;
    })
    .map((todo: ITodo) => {
      return <TodoItem key={todo._id} {...todo} />;
    });

  todoBlock = useMemo(() => todoBlock, [todoBlock]);

  return (
    <div className={s.todoList}>
      <div>
        <h1>Todo List</h1>
      </div>
      <div className={s.todoList_scrollBox}>
        {!todoBlock.length && <p>there is nothing here, add first...</p>}
        <ul>{todoBlock}</ul>
      </div>
    </div>
  );
};

export default TodoList;
