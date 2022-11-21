import axios from "axios";
import { BASE_URL } from "../constants/constants";
import { IMongoTodo, IUser, TodoData, UserDate } from "../models/ITodo";

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

const completedTodo = (id: string) => {
  return axios.put(
    BASE_URL + `/todo/completed/${id}`,
    { id },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

const updatedTodo = (data: TodoData) => {
  return axios.put(
    BASE_URL + `/todo/updated/${data.idd}`,
    { ...data },
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

export { fetchTodos, loginUser, addTodoDB, completedTodo, updatedTodo };
