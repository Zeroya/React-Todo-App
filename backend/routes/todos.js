import express from "express";
import { getTodos, addTodo, toggleTodoDone, updateTodo, deleteTodo } from "../controllers/todosController.js";
import { checkAuth } from "../middlewares/checkAuth.js";

const router = express.Router();

router.get("/", checkAuth, getTodos);

router.post("/add", checkAuth, addTodo);

router.put("/completed/:id", checkAuth, toggleTodoDone);

router.put("/updated/:id", checkAuth, updateTodo);

router.delete("/delete/:id", checkAuth, deleteTodo);

router.delete("/delete", checkAuth, deleteTodo);

export default router;
