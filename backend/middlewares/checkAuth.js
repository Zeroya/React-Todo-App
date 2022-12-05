import jwt from "jsonwebtoken";
import createError from "./createError.js";
import * as dotenv from "dotenv";

dotenv.config();

export const checkAuth = (req, res, next) => {
  let token = req.headers["authorization"];
  token = token.split(" ")[1];

  if (!token) {
    return next(createError({ status: 401, message: "Unauthorized" }));
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return next(createError({ status: 401, message: "Unauthorized, invalid token" }));
    }
    req.user = user;
    return next();
  });
};
