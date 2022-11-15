import Todos from "../models/todoModal.js";

const getTodos = async (req, res) => {
  Todos.find({})
    .then((items) => {
      res.json(items);
    })
    .catch((err) => {
      console.log("Error", err);
    });
};

export { getTodos };
