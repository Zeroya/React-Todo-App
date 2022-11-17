import express from "express";
import { getTodos, addTodo } from "../controllers/todosController.js";

const router = express.Router();

router.get("/", getTodos);

router.post("/add", addTodo);

export default router;
