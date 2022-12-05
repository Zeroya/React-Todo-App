import axios from "axios";
import { BASE_URL, HEADERS, CREDENTIALS } from "../constants/constants";

const instance = axios.create({
  baseURL: BASE_URL,
  headers: HEADERS,
  ...CREDENTIALS,
});

instance.interceptors.response.use(
  function (res) {
    return res;
  },
  function (err) {
    if (err?.response?.status === 401) {
      localStorage.removeItem("userData");
      return err.response;
    }
    return Promise.reject(err);
  }
);

export default instance;
