import axios from "axios";
import { BASE_URL, HEADERS, CREDENTIALS } from "../constants/constants";
import instance from "../interceptors/axios";
import { IMongoTodo, IUser, TodoData } from "../models/ITodo";

const addTodoDB = (form: IMongoTodo) => {
  return instance.post("/todo/add", { ...form });
};

const completedTodo = (id: string) => {
  return instance.put(`/todo/completed/${id}`, { id });
};

const updatedTodo = (data: TodoData) => {
  return instance.put(`/todo/updated/${data.idd}`, { ...data });
};

const filterAllTodos = (param: string, userId: string) => {
  return instance.get(`/todo/filter/${param}`, { params: { userId } });
};

const deletedTodo = (id?: string) => {
  if (id) {
    return instance.delete(`/todo/delete/${id}`);
  }
  return instance.delete("/todo/delete");
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

const registerUser = (form: IUser) => {
  return axios.post(
    BASE_URL + "/auth/register",
    { ...form },
    {
      headers: HEADERS,
      ...CREDENTIALS,
    }
  );
};

const tokenRefresh = () => {
  return axios.get(BASE_URL + "/auth/token", {
    headers: HEADERS,
    ...CREDENTIALS,
  });
};

const isLogout = () => {
  return axios.get(BASE_URL + "/auth/logout", {
    headers: HEADERS,
    ...CREDENTIALS,
  });
};

const isLoggedIn = () => {
  return instance.get("/auth/loggedIn");
};

export {
  loginUser,
  registerUser,
  addTodoDB,
  completedTodo,
  updatedTodo,
  deletedTodo,
  isLoggedIn,
  tokenRefresh,
  isLogout,
  filterAllTodos,
};
