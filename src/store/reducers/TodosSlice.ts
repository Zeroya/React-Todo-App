import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ITodo, UserData } from '../../models/ITodo';
import { v4 as uuidv4 } from 'uuid';

interface CounterState {
  todos: ITodo[]
}

const initialState: CounterState = {
  todos: [],
}

export const counterSlice = createSlice({
  name: 'todos',

  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.todos.push({
        id: uuidv4(),
        message: action.payload,
        completed: false,
        data: new Date().toLocaleDateString().split(".").join(".") + ' ' + new Date().toLocaleTimeString().slice(0, -3),
        dataExpiration:new Date().toLocaleDateString().split(".").map((el,i) => i == 0 ? Number(el)+1: el).join(".") + ' ' + new Date().toLocaleTimeString().slice(0, -3),
      })
    },
    addModalTodo: (state, action: PayloadAction<UserData>) => {
      state.todos.push({
        id: uuidv4(),
        message: action.payload.message,
        completed: false,
        data: action.payload.data.split("").map(el => el == "T" ? " " : el == "-" ? "." : el).join("").slice(0,10).split(".").reverse().join('.').concat(" ").concat(action.payload.data.slice(11,16)),
        dataExpiration:action.payload.expData.split("").map(el => el == "T" ? " " : el == "-" ? "." : el).join("").slice(0,10).split(".").reverse().join('.').concat(" ").concat(action.payload.expData.slice(11,16)),
      })
    },
  },
})

export const { addTodo, addModalTodo } = counterSlice.actions;
export default counterSlice.reducer;
