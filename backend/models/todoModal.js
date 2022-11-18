import mongoose from "mongoose";

const Schema = mongoose.Schema;

const todoSchema = new Schema({
  message: String,
  date: String,
  dateExpiration: String,
  completed: Boolean,
});

const Todo = mongoose.model("todo", todoSchema);

export default Todo;
