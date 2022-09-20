import React, {useState} from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { addTodo } from '../../store/reducers/TodosSlice';

const TodoHeader: React.FC = () => {

  const dispatch = useAppDispatch();
  const chatUsers = useAppSelector(state => state.todos);
  console.log(chatUsers);
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
      <input value={input} onChange={handleChange} type="text" />
      </form>
    </div>
  )
}

export default TodoHeader