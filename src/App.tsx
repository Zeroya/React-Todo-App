import React from 'react';
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import { increment } from './store/reducers/UserSlice';
import './App.css';

const App: React.FC = () => {

  const value = useAppSelector(state => state.value.value);
  const dispatch = useAppDispatch();

  return (
    <div className="App">
      <p>TS Template</p>
      <div><button onClick={() => dispatch(increment())}>+1 к счастью</button><p>{value}</p></div>
    </div>
  );
}

export default App;
