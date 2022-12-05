import express from "express";
import { authLogin, isLoggedIn, tokenRefresh } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", authLogin);

router.get("/loggedIn", isLoggedIn);

router.get("/token", tokenRefresh);

export default router;
