import axios from "axios";
import { BASE_URL, HEADERS } from "../constants/constants";
import { IMongoTodo, IUser, TodoData } from "../models/ITodo";

const fetchTodos = () => {
  return axios.get(BASE_URL + "/todo");
};

const addTodoDB = (form: IMongoTodo) => {
  return axios.post(
    BASE_URL + "/todo/add",
    { ...form },
    {
      headers: HEADERS,
    }
  );
};

const completedTodo = (id: string) => {
  return axios.put(
    BASE_URL + `/todo/completed/${id}`,
    { id },
    {
      headers: HEADERS,
    }
  );
};

const updatedTodo = (data: TodoData) => {
  return axios.put(
    BASE_URL + `/todo/updated/${data.idd}`,
    { ...data },
    {
      headers: HEADERS,
    }
  );
};

const loginUser = (form: IUser) => {
  return axios.post(
    BASE_URL + "/auth/login",
    { ...form },
    {
      headers: HEADERS,
    }
  );
};

export { fetchTodos, loginUser, addTodoDB, completedTodo, updatedTodo };
