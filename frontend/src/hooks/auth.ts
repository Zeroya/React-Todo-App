import { useState, useEffect, useCallback } from "react";
import { useAppDispatch } from "../hooks/hooks";
import { removejwtToken } from "../store/reducers/UserSlice";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState("");
  const [isReady, setIsReady] = useState(false);

  const login = useCallback((jwtToken: any, id: string) => {
    setToken(jwtToken);
    setUserId(id);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: id,
        token: jwtToken,
      })
    );
  }, []);

  const logout = () => {
    setToken(null);
    setUserId("");
    localStorage.removeItem("userData");
    dispatch(removejwtToken());
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData") || "{}");
    if (data && data.token) {
      login(data.token, data.userId);
    }
    setIsReady(true);
  }, [login]);

  return { login, logout, token, userId, isReady };
};
