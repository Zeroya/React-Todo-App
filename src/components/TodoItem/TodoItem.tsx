import React, { FC } from "react";
import { ITodo } from "../../models/ITodo";
import { completeTodo, deleteTodo } from "../../store/reducers/UserSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import s from "./TodoItem.module.scss";

const TodoItem: FC<ITodo> = ({ id, message, date, dateExpiration, completed }) => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todos.todos);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(completeTodo(id));
  };

  const handleDelete = (e: React.MouseEvent<HTMLSpanElement>): void => {
    dispatch(deleteTodo(id));
  };

  const completeLogic = completed ? s.completed : "";

  return (
    <li className={`${s.todoItem} ${completed ? s.todoItem_checked : ""}`}>
      <input
        className="form-check-input dark"
        type="checkbox"
        id="checkboxNoLabel"
        checked={completed}
        onChange={handleChange}
      />
      <div className={s.todoItem_message}>
        <p className={`${completeLogic}`}>{message}</p>
      </div>
      <div className={`${s.todoItem_expData} ${s.todoItem_textColor} ${completeLogic}`}>
        <p>Creation date</p>
        <p>{date}</p>
      </div>
      <div className={`${s.todoItem_expData} ${completeLogic}`}>
        <p>Expiration date</p>
        <p>{dateExpiration}</p>
      </div>
      <span onClick={handleDelete}>
        <i className="fa fa-times" aria-hidden="true"></i>
      </span>
    </li>
  );
};

export default TodoItem;
