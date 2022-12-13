import express from "express";
import { authLogin, isLoggedIn, tokenRefresh, logout, authRegister } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", authLogin);

router.post("/register", authRegister);

router.get("/logout", logout);

router.get("/loggedIn", isLoggedIn);

router.get("/token", tokenRefresh);

export default router;
