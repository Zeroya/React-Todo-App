import React from "react";
import { ITodo } from "../../models/ITodo";
import s from "./TodoItem.module.scss";

const TodoItem: React.FC<ITodo> = ({ message, date, dateExpiration }) => {
  return (
    <li className={s.todoItem}>
      <input type="checkbox" />
      <div className={s.todoItem_message}>
        <p>{message}</p>
      </div>
      <p>{date}</p>
      <div className={s.todoItem_expData}>
        <p>Expiration data</p>
        <p>{dateExpiration}</p>
      </div>
      <span>
        <i className="fa fa-trash" aria-hidden="true"></i>
      </span>
    </li>
  );
};

export default TodoItem;
