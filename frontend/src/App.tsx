import React, { FC, useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "./hooks/hooks";
import { useRoutes } from "./hooks/routes";
import { isLoggedIn, tokenRefresh } from "./api/todoApi";
import "./App.css";
import { addjwtFlag } from "./store/reducers/UserSlice";

const App: FC = () => {
  const [checker, setChecker] = useState(false);
  const dispatch = useAppDispatch();
  const jwtToken = useAppSelector((state) => state.todos.jwtToken);
  const jwtFlag = useAppSelector((state) => state.todos.jwtFlag);

  const tokenActive = localStorage.getItem("userData");

  const verifyAuth = async () => {
    try {
      const res = await isLoggedIn();
      dispatch(addjwtFlag(res.data));
      setChecker(!!res.data);
    } catch (err) {
      return false;
    }
  };

  const tokenRefreshed = async () => {
    try {
      await tokenRefresh();
    } catch (err) {
      return false;
    }
  };

  useEffect(() => {
    verifyAuth();
    tokenRefreshed();
  }, [tokenActive, jwtFlag]);

  useEffect(() => {
    tokenRefreshed();
  }, []);

  const routes = useRoutes(!jwtToken ? !!jwtToken : !!jwtFlag);
  if (jwtFlag === undefined) return <h3>loading...</h3>;
  return <div className="App">{routes}</div>;
};

export default App;
