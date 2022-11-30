import axios from "axios";
import { BASE_URL, HEADERS, CREDENTIALS } from "../constants/constants";
import Cookies from "universal-cookie";

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
      const cookies = new Cookies();
      cookies.remove("jwt");
      return err.response;
    }
    return Promise.reject(err);
  }
);

export default instance;
