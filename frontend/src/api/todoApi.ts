import axios from "axios";
import { BASE_URL } from "../constants/constants";
import { IMongoTodo, IUser } from "../models/ITodo";

const fetchTodos = () => {
  return axios.get(BASE_URL + "/todo");
};

const addTodoDB = (form: IMongoTodo) => {
  return axios.post(
    BASE_URL + "/todo/add",
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
    BASE_URL + "/auth/login",
    { ...form },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export { fetchTodos, loginUser, addTodoDB };
