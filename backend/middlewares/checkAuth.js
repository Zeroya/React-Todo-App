import jwt from "jsonwebtoken";
import createError from "./createError.js";
import * as dotenv from "dotenv";

dotenv.config();

export const checkAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next(createError({ status: 401, message: "Unauthorized" }));
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      res.status(401).json({ message: "Not authorized" });
    }
    req.user = user;
    return next();
  });
};
