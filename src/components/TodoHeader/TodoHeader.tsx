import React, {useState} from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { addTodo } from '../../store/reducers/TodosSlice';
import ModalWindow from '../ModalWindow/ModalWindow';

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
    <div>
      <form onSubmit={submitValue}>
      <input value={input} onChange={handleChange} type="text" pattern="^[A-Za-zА-Яа-яЁё0-9\s]+$" />
      <ModalWindow />
      </form>
    </div>
  )
}

export default TodoHeader