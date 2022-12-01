import React, { FC, useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "./hooks/hooks";
import { useRoutes } from "./hooks/routes";
import { isLoggedIn } from "./api/todoApi";
import Cookies from "universal-cookie";
import "./App.css";
import { addjwtFlag } from "./store/reducers/UserSlice";

const App: FC = () => {
  const [checker, setChecker] = useState(false);
  const dispatch = useAppDispatch();
  const jwtToken = useAppSelector((state) => state.todos.jwtToken);
  const jwtFlag = useAppSelector((state) => state.todos.jwtFlag);

  const cookies = new Cookies();
  const cookieChecker = cookies.get("jwt");

  const verifyAuth = async () => {
    try {
      const res = await isLoggedIn();
      dispatch(addjwtFlag(res.data));
      setChecker(!!res.data);
    } catch (err) {
      return false;
    }
  };

  useEffect(() => {
    verifyAuth();
  });

  useEffect(() => {
    verifyAuth();
  }, [cookieChecker, jwtFlag]);

  const routes = useRoutes(!!jwtFlag);
  if (jwtFlag === undefined) return <h3>loading...</h3>;
  return <div className="App">{routes}</div>;
};

export default App;
