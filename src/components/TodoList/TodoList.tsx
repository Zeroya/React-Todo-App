import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { ITodo } from '../../models/ITodo';
import TodoItem from '../TodoItem/TodoItem';

const TodoList: React.FC = () => {

const todos = useAppSelector(state => state.todos.todos);

console.log(todos);

  return (
    <div>
      <ul>
        {todos.map( (todo:ITodo) => {
          return (
            <TodoItem key={todo.id} todo={todo} />
          );
        })}
      </ul>
    </div>
  )
}

export default TodoList
