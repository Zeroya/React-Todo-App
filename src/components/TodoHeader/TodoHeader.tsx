import React, { FC, useState, FormEvent, ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { addTodo, checker } from "../../store/reducers/UserSlice";
import ModalWindow from "../ModalWindow/ModalWindow";
import InputGroup from "react-bootstrap/InputGroup";
import { Сondition } from "../../models/Enums";
import s from "./TodoHeader.module.scss";

const TodoHeader: FC = () => {
  const filtValue = useAppSelector((state) => state.todos.filtValue);
  const dispatch = useAppDispatch();
  const [input, setInput] = useState("");

  const submitValue = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim()) {
      dispatch(addTodo(input));
      setInput("");
      if (filtValue === Сondition.active || filtValue === Сondition.completed) {
        dispatch(checker());
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value);
  };

  return (
    <div className={s.todoHeader}>
      <h1>Todo Input</h1>
      <form onSubmit={submitValue}>
        <InputGroup>
          <input
            value={input}
            onChange={handleChange}
            className={s.todoHeader_input}
            type="text"
            pattern="^[A-Za-zА-Яа-яЁё0-9\s]+$"
            required
          />
          <InputGroup.Text className={s.todoHeader_modal}>
            <ModalWindow />
          </InputGroup.Text>
        </InputGroup>
      </form>
    </div>
  );
};

export default TodoHeader;
