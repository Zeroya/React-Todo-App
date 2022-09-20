import React from 'react';
import TodoHeader from './components/TodoHeader/TodoHeader';
import TodoList from './components/TodoList/TodoList';
import './App.css';


const App: React.FC = () => {

  return (
    <div className="App">
      <TodoHeader />
      <TodoList />
    </div>
  );
}

export default App;
