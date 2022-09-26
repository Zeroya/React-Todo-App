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
  filtValue: string;
  checker: boolean;
}

const initialState: CounterState = {
  todos: [],
  filtValue: "all",
  checker: false,
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
      const { message, date, expDate } = action.payload;
      state.todos.push({
        id: uuidv4(),
        message: message,
        completed: false,
        date: getCreationModalDate(date),
        dateExpiration: getCreationModalDate(expDate),
        dateStored: { date, expDate },
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
    checker: (state) => {
      state.checker = !state.checker;
    },
    filterTodos: (state, action: PayloadAction<string>) => {
      action.payload === "сlearCompleted" && (state.todos = state.todos.filter((todo) => todo.completed === false));
      (action.payload === "active" || "completed" || "all") && (state.filtValue = action.payload);
    },
  },
});

export const { addTodo, addModalTodo, completeTodo, deleteTodo, updateTodo, filterTodos, checker } =
  counterSlice.actions;
export default counterSlice.reducer;
