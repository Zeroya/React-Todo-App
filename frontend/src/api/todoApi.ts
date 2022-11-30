import axios from "axios";
import { BASE_URL, HEADERS, CREDENTIALS } from "../constants/constants";
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

const isLoggedIn = () => {
  return axios.get(BASE_URL + "/auth/loggedIn", CREDENTIALS);
};

const isLogout = () => {
  return axios.get(BASE_URL + "/auth/logout", {
    ...CREDENTIALS,
    headers: HEADERS,
  });
};

export { fetchTodos, loginUser, addTodoDB, completedTodo, updatedTodo, deletedTodo, isLoggedIn, isLogout };
