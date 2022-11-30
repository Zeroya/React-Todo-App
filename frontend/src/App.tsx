import React, { FC, useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "./hooks/hooks";
import { useRoutes } from "./hooks/routes";
import { isLoggedIn } from "./api/todoApi";
import "./App.css";
import { addjwtFlag } from "./store/reducers/UserSlice";

const App: FC = () => {
  const [checker, setChecker] = useState(false);
  const dispatch = useAppDispatch();
  const jwtToken = useAppSelector((state) => state.todos.jwtToken);
  const jwtFlag = useAppSelector((state) => state.todos.jwtFlag);

  const verifyAuth = async () => {
    try {
      const res = await isLoggedIn();
      dispatch(addjwtFlag(res.data));
      setChecker(!!res.data);
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  useEffect(() => {
    verifyAuth();
  });

  useEffect(() => {
    setInterval(() => {
      checker && verifyAuth();
    }, 10000);
  });

  const routes = useRoutes(!!jwtFlag);
  if (jwtFlag === undefined) return <h3>loading...</h3>;
  return <div className="App">{routes}</div>;
};

export default App;
