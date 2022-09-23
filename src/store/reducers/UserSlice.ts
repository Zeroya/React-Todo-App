import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ITodo, UserDate, TodoData } from "../../models/ITodo";
import {
  getCreationInputDate,
  getCreationInputDateExpiration,
  getCreationModalDate,
  getCreationStoredInputDate,
  getCreationStoredDateExpiration,
} from "../../utils/CreateDate";
import { v4 as uuidv4 } from "uuid";

interface CounterState {
  todos: ITodo[];
}

const initialState: CounterState = {
  todos: [],
};

export const counterSlice = createSlice({
  name: "todos",

  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.todos.push({
        id: uuidv4(),
        message: action.payload,
        completed: false,
        date: getCreationInputDate(),
        dateExpiration: getCreationInputDateExpiration(),
        dateStored: {
          date: getCreationStoredInputDate(),
          expDate: getCreationStoredDateExpiration(),
        },
      });
    },
    addModalTodo: (state, action: PayloadAction<UserDate>) => {
      state.todos.push({
        id: uuidv4(),
        message: action.payload.message,
        completed: false,
        date: getCreationModalDate(action.payload.date),
        dateExpiration: getCreationModalDate(action.payload.expDate),
        dateStored: { date: action.payload.date, expDate: action.payload.expDate },
      });
    },
    completeTodo: (state, action: PayloadAction<string>) => {
      state.todos.map((todo) => (todo.id === action.payload ? (todo.completed = !todo.completed) : todo));
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    updateTodo: (state, action: PayloadAction<TodoData>) => {
      const { message, date, expDate } = action.payload;
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload.idd
          ? {
              ...todo,
              message: message,
              date: getCreationModalDate(date),
              dateExpiration: getCreationModalDate(expDate),
            }
          : todo
      );
    },
  },
});

export const { addTodo, addModalTodo, completeTodo, deleteTodo, updateTodo } = counterSlice.actions;
export default counterSlice.reducer;
