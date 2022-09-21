import React from "react";
import { ITodo } from "../../models/ITodo";
import { completeTodo } from "../../store/reducers/UserSlice";
import { useAppDispatch } from "../../hooks/hooks";
import s from "./TodoItem.module.scss";

const TodoItem: React.FC<ITodo> = ({ id, message, date, dateExpiration, completed }) => {
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(completeTodo(id));
  };

  return (
    <li className={s.todoItem}>
      <input
        className="form-check-input dark"
        type="checkbox"
        id="checkboxNoLabel"
        checked={completed}
        onChange={handleChange}
      />
      <div className={s.todoItem_message}>
        <p className={`${completed ? s.completed : ""}`}>{message}</p>
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
