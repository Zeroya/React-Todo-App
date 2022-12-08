import axios from "axios";
import { BASE_URL, HEADERS, CREDENTIALS } from "../constants/constants";
import { tokenRefresh } from "../api/todoApi";
import jwt_decode from "jwt-decode";

const instance = axios.create({
  baseURL: BASE_URL,
  headers: HEADERS,
  ...CREDENTIALS,
});

instance.interceptors.request.use(
  async (config) => {
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");

    if (userData?.token) {
      config.headers = config.headers ?? {};
      config.headers["x-auth-token"] = userData.token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (res) {
    return res;
  },
  async function (err) {
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    const originalConfig = err?.config;

    if (err.response.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;

      try {
        const rs = await tokenRefresh();

        localStorage.removeItem("userData");
        localStorage.setItem(
          "userData",
          JSON.stringify({
            userId: userData.userId,
            ...rs.data,
            refreshToken: userData.refreshToken,
          })
        );

        originalConfig.headers = originalConfig.headers ?? {};
        originalConfig.headers = {
          ...originalConfig.headers,
          "x-auth-token": rs.data.token,
        };

        return instance.request(originalConfig);
      } catch (_error) {
        return Promise.reject(_error);
      }
    }
    return Promise.reject(err);
  }
);

export default instance;
