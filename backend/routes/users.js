import express from "express";
import { authLogin, isLoggedIn, tokenRefresh, logout } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", authLogin);

router.get("/logout", logout);

router.get("/loggedIn", isLoggedIn);

router.get("/token", tokenRefresh);

export default router;
