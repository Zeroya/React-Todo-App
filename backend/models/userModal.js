import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 5 },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

export default User;
