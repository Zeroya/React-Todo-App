import React from 'react'
import './style.scss';
import '../../App.jsx'



const TodoItem = ({todo, editTodo, removeTodo}) => {
  const handleChange = () => {
    todo.completed = !todo.completed;
    editTodo(todo);
  };

  const handleDelete = () => {
    removeTodo(todo.id);
  };
  {/* 
  function dragOverHandler(e) {
    e.preventDefault();
    if (e.target.className == 'item') {
      e.target.style.boxShadow = '0 4px 3px gray'
    }
  }
  
  function dragLeaveHandler(e) {
    e.target.style.boxShadow = 'none'
  }
  
  function dragStartHandler(e,item) {
    setTodos(item)
  }
  
  function dragEndHandler(e) {
    e.target.style.boxShadow = 'none'
  }
  
  function drapHandler(e,item) {
    e.preventDefault();
    const currentIndex = setTodos.items.id.indexOf(currentIndex);
    setTodos.id.splice( currentIndex, 1);
    setTodos(todo.map(b => {
      if (b.id === currentIndex.id) {
        return currentIndex
      }
    }))
  }  */}

{/* onDragOver={(e) => dragOverHandler(e)}
        onDragLeave={(e) => dragLeaveHandler(e)}
        onDragStart={(e) => dragStartHandler(e,item)}
        onDragEnd={(e) => dragEndHandler(e)}
        onDrop={(e) => drapHandler(e,app,item)} */}


  return (
    <li 
    draggable={true} className='item'>
      <input type="checkbox"  checked={todo.completed}  onChange={handleChange} />
      <p className={`${todo.completed ? "completed" : "" }`}>{todo.title}</p>
      <span onClick={handleDelete}><i className="fa fa-trash" aria-hidden="true"></i></span>
    </li>
  )
}

export default TodoItem
