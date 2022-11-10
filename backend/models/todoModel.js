import mongoose from "mongoose";

const Schema = mongoose.Schema;

const todoSchema = new Schema(
  {
    id: String,
    message: String,
    date: String,
    dateExpiration: String,
    completed: Boolean,
    dateStored: Object,
  },
  { timestamps: true }
);

const TodoModal = mongoose.model("todoModal", todoSchema);

export default TodoModal;
