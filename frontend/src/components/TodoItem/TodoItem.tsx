import React, { FC, ChangeEvent, MouseEvent } from "react";
import { ITodo } from "../../models/ITodo";
import { completeTodo, deleteTodo } from "../../store/reducers/UserSlice";
import { useAppDispatch } from "../../hooks/hooks";
import s from "./TodoItem.module.scss";
import ModalWindow from "../ModalWindow/ModalWindow";

const TodoItem: FC<ITodo> = ({ _id, message, date, dateExpiration, completed, dateStored }) => {
  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(completeTodo(_id));
  };

  const handleDelete = (e: MouseEvent<HTMLSpanElement>): void => {
    dispatch(deleteTodo(_id));
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
      <div className={s.todoItem_changeField}>
        <span>
          <ModalWindow type="chenge" message={message} date={dateStored.date} expDate={dateStored.expDate} idd={_id} />
        </span>
        <span onClick={handleDelete}>
          <i className="fa fa-times" aria-hidden="true"></i>
        </span>
      </div>
    </li>
  );
};

export default TodoItem;
