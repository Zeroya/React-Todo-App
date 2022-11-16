import express from "express";
import { authLogin } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", authLogin);

export default router;
