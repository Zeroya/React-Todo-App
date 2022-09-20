import React from 'react'
import { ITodo } from '../../models/ITodo'

const TodoItem: React.FC<{todo:ITodo}> = (props) => {

  return (
    <li className='item'>
      <input type="checkbox" />
      <p>{props.todo.message}</p>
      <p>{props.todo.data}</p>
      <p>{props.todo.dataExpiration}</p>
      <span><i className="fa fa-trash" aria-hidden="true"></i></span>
    </li>
  )
}

export default TodoItem
