import axios from "axios";

const fetchTodos = () => {
  return axios.get(`https://mern-todo-app-a66w.onrender.com/`);
};

export { fetchTodos };
