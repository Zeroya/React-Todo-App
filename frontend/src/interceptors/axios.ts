import axios from "axios";
import { BASE_URL, HEADERS, CREDENTIALS } from "../constants/constants";
import { tokenRefresh } from "../api/todoApi";
import jwt_decode from "jwt-decode";

const instance = axios.create({
  baseURL: BASE_URL,
  headers: HEADERS,
  ...CREDENTIALS,
});

instance.interceptors.request.use(async (config) => {
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  let currentDate = new Date();
  const decodedToken: any = jwt_decode(userData.token);

  if (decodedToken.exp * 1000 < currentDate.getTime()) {
    const res = await tokenRefresh();
    localStorage.removeItem("userData");
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: userData.userId,
        ...res.data,
        refreshToken: userData.refreshToken,
      })
    );
  }
  return config;
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
