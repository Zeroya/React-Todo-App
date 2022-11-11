import express from "express";
import TodoModel from "../models/todoModel.js";

const router = express.Router();

router.get("/", (req, res) => {
  TodoModel.find({})
    .then((items) => {
      res.json(items);
    })
    .catch((err) => {
      console.log("Error", err);
    });
});

export default router;
