import axios from "axios";
import { BASE_URL, HEADERS, CREDENTIALS } from "../constants/constants";
import instance from "../interceptors/axios";
import { IMongoTodo, IUser, TodoData } from "../models/ITodo";

const fetchTodos = () => {
  return axios.get(BASE_URL + "/todo");
};

const addTodoDB = (form: IMongoTodo) => {
  return instance.post("/todo/add", { ...form });
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

const deletedTodo = (id: string) => {
  return axios.delete(BASE_URL + `/todo/delete/${id}`);
};

const loginUser = (form: IUser) => {
  return axios.post(
    BASE_URL + "/auth/login",
    { ...form },
    {
      ...CREDENTIALS,
      headers: HEADERS,
    }
  );
};

const tokenRefresh = () => {
  return axios.get(BASE_URL + "/auth/token", {
    headers: HEADERS,
    ...CREDENTIALS,
  });
};

const isLoggedIn = () => {
  return instance.get("/auth/loggedIn");
};

export { fetchTodos, loginUser, addTodoDB, completedTodo, updatedTodo, deletedTodo, isLoggedIn, tokenRefresh };
