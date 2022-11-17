import axios from "axios";
import { IMongoTodo, IUser } from "../models/ITodo";

const fetchTodos = () => {
  return axios.get(`https://mern-todo-app-a66w.onrender.com/todo`);
};

const addTodoDB = (form: IMongoTodo) => {
  return axios.post(
    "https://mern-todo-app-a66w.onrender.com/todo/add",
    { ...form },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

const loginUser = (form: IUser) => {
  return axios.post(
    "https://mern-todo-app-a66w.onrender.com/auth/login",
    { ...form },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export { fetchTodos, loginUser, addTodoDB };
