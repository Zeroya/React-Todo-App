import express from "express";
import { authLogin, isLoggedIn, logout } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", authLogin);

router.get("/loggedIn", isLoggedIn);

router.get("/logout", logout);

export default router;
