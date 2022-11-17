import Todos from "../models/todoModal.js";

const getBindTodos = async (req, res) => {
  Todos.find({})
    .then((items) => {
      res.json(items);
    })
    .catch((err) => {
      console.log("Error", err);
    });
};

const getTodo = async (req, res) => {
  try {
    const { message, date, dateExpiration, dateStored } = req.body;

    const todo = await new Todos({
      message,
      date,
      dateExpiration,
      completed: false,
      dateStored,
    });

    await todo.save();
    res.json(todo);
  } catch (error) {
    console.error(error);
  }
};

export { getBindTodos, getTodo };
