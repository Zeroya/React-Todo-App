import { isLoggedIn } from "../api/todoApi";
import { useEffect, useState } from "react";

export const useLoggedIn = () => {
  const [auth, setAuth] = useState();

  const verifyAuth = async () => {
    try {
      const res = await isLoggedIn();
      setAuth(res.data);
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  useEffect(() => {
    verifyAuth();
  }, []);

  return { auth };
};
