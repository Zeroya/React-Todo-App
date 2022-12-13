import mongoose, { Types } from "mongoose";

const Schema = mongoose.Schema;

const todoSchema = new Schema({
  owner: { type: Types.ObjectId, ref: "user" },
  message: String,
  date: String,
  dateExpiration: String,
  completed: Boolean,
});

const Todo = mongoose.model("todo", todoSchema);

export default Todo;
