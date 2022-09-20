import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { addTodo } from '../../store/reducers/TodosSlice';
import ModalWindow from '../ModalWindow/ModalWindow';
import InputGroup from 'react-bootstrap/InputGroup';
import s from "./TodoHeader.module.scss";

const TodoHeader: React.FC = () => {

  const dispatch = useAppDispatch();
  const [input, setInput] = useState('');

  const submitValue = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addTodo(input));
    setInput('');
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value);
  }

  return (
    <div className={s.todoHeader}>
      <h1>Todo Input</h1>
      <form onSubmit={submitValue}>
        <InputGroup>
          <input value={input} onChange={handleChange} className={s.todoHeader_input} type="text" pattern="^[A-Za-zА-Яа-яЁё0-9\s]+$" />
          <InputGroup.Text className={s.todoHeader_modal}>
            <ModalWindow />
          </InputGroup.Text>
        </InputGroup>
      </form>
    </div>
  )
}

export default TodoHeader