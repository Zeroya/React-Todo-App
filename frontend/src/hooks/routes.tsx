import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/AuthPage";
import TodoPage from "../pages/TodoPage";

export const useRoutes = (isLogin: boolean) => {
  return isLogin ? (
    <Routes>
      <Route path="/" element={<TodoPage />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  ) : (
    <Login />
  );
};
