import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Сondition, SortOptions } from "../../models/Enums";
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
  searchValue: string;
}

const initialState: CounterState = {
  todos: [],
  filtValue: Сondition.all,
  checker: false,
  searchValue: "",
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
        message,
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
              message,
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
      action.payload === "сlearCompleted" && (state.todos = state.todos.filter((todo) => !todo.completed));
      (action.payload === Сondition.active || Сondition.completed || Сondition.all) &&
        (state.filtValue = action.payload);
    },
    sortTodosBy: (state, action: PayloadAction<string>) => {
      !SortOptions.message.localeCompare(action.payload) &&
        (state.todos = state.todos.sort((a: ITodo, b: ITodo) => a.message.localeCompare(b.message)));
      !SortOptions.date.localeCompare(action.payload) &&
        (state.todos = state.todos.sort((a: ITodo, b: ITodo) => {
          let dateA = new Date(getCreationModalDate(a.dateExpiration)).getTime();
          let dateB = new Date(getCreationModalDate(b.dateExpiration)).getTime();
          return dateA - dateB;
        }));
    },
    addSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    addMongoTodos: (state, action: PayloadAction<ITodo[]>) => {
      state.todos.push(...action.payload);
    },
  },
});

export const {
  addTodo,
  addModalTodo,
  completeTodo,
  deleteTodo,
  updateTodo,
  filterTodos,
  checker,
  sortTodosBy,
  addSearchValue,
  addMongoTodos,
} = counterSlice.actions;
export default counterSlice.reducer;
