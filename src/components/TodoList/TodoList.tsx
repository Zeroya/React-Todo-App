import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { ITodo } from '../../models/ITodo';
import TodoItem from '../TodoItem/TodoItem';
import s from "./TodoList.module.scss";

const TodoList: React.FC = () => {

  const todos = useAppSelector(state => state.todos.todos);

  console.log(todos);

  return (
    <div className={s.todoList}>
      <div>
        <h1>Todo List</h1>
      </div>
      <div className={s.todoList_scrollBox}>
        <ul>
          {todos.map((todo: ITodo) => {
            return (
              <TodoItem key={todo.id} todo={todo} />
            );
          })}
        </ul>
      </div>
    </div>
  )
}

export default TodoList
