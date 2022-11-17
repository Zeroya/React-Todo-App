import express from "express";
import { getBindTodos, getTodo } from "../controllers/todosController.js";

const router = express.Router();

router.get("/", getBindTodos);

router.post("/add", getTodo);

export default router;
