import { useState, useEffect, useCallback } from "react";
import { isLogout } from "../api/todoApi";
import { useAppDispatch } from "../hooks/hooks";
import { removejwtToken, addjwtFlag, deleteAllTodos } from "../store/reducers/UserSlice";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState("");
  const [isReady, setIsReady] = useState(false);

  const login = useCallback((jwtToken: string, refreshToken: string, id: string) => {
    setToken(jwtToken);
    setUserId(id);
    dispatch(addjwtFlag(true));
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: id,
        token: jwtToken,
        refreshToken: refreshToken,
      })
    );
  }, []);

  const logout = async () => {
    await isLogout();
    setToken(null);
    setUserId("");
    localStorage.removeItem("userData");
    dispatch(removejwtToken());
    dispatch(deleteAllTodos());
    dispatch(addjwtFlag(false));
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData") || "{}");
    if (data && data.token) {
      login(data.token, data.refreshToken, data.userId);
    }
    setIsReady(true);
  }, [login]);

  return { login, logout, token, userId, isReady };
};
