import express from "express";
import { getTodos, addTodo, toggleTodoDone, updateTodo } from "../controllers/todosController.js";

const router = express.Router();

router.get("/", getTodos);

router.post("/add", addTodo);

router.put("/completed/:id", toggleTodoDone);

router.put("/updated/:id", updateTodo);

export default router;
