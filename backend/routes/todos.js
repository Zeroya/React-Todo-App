import express from "express";
import Todos from "../models/todoModal.js";

const router = express.Router();

router.get("/", (req, res) => {
  Todos.find({})
    .then((items) => {
      res.json(items);
    })
    .catch((err) => {
      console.log("Error", err);
    });
});

export default router;
