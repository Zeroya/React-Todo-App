import axios from "axios";
import { IUser } from "../models/ITodo";

const fetchTodos = () => {
  return axios.get(`https://mern-todo-app-a66w.onrender.com/`);
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

export { fetchTodos, loginUser };
