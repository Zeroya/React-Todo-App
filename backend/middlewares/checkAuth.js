import jwt from "jsonwebtoken";
import createError from "./createError.js";
import * as dotenv from "dotenv";

dotenv.config();

export const checkAuth = async (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return next(createError({ status: 401, message: "Token not found" }));
  }

  try {
    const user = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log(req.user);
    req.user = user;
    console.log(req.user);
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired access token" });
  }
};
