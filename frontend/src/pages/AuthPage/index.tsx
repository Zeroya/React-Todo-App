import React, { FC } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "../../components/Auth/Login";

const AuthPage: FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate replace to="/login" />} />
    </Routes>
  );
};

export default AuthPage;
