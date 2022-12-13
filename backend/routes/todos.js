import express from "express";
import { addTodo, toggleTodoDone, updateTodo, deleteTodo, filterTodos } from "../controllers/todosController.js";
import { checkAuth } from "../middlewares/checkAuth.js";

const router = express.Router();

router.post("/add", checkAuth, addTodo);

router.put("/completed/:id", checkAuth, toggleTodoDone);

router.put("/updated/:id", checkAuth, updateTodo);

router.delete("/delete/:id", checkAuth, deleteTodo);

router.delete("/delete", checkAuth, deleteTodo);

router.get("/filter/:param", checkAuth, filterTodos);

export default router;
