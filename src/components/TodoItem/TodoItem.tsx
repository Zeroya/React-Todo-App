import React from 'react';
import { ITodo } from '../../models/ITodo';
import s from "./TodoItem.module.scss";

const TodoItem: React.FC<{ todo: ITodo }> = (props) => {

  return (
    <li className={s.todoItem}>
      <input type="checkbox" />
      <div className={s.todoItem_message}>
        <p>{props.todo.message}</p>
      </div>
      <p>{props.todo.data}</p>
      <div className={s.todoItem_expData}>
        <p>Expiration data</p>
        <p>{props.todo.dataExpiration}</p>
      </div>
      <span><i className="fa fa-trash" aria-hidden="true"></i></span>
    </li>
  )
}

export default TodoItem;
