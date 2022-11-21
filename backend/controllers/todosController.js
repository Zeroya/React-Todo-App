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

const addTodo = async (req, res) => {
  try {
    const { message, date, dateExpiration } = req.body;

    const todo = await new Todos({
      message,
      date,
      dateExpiration,
      completed: false,
    });

    await todo.save();
    res.json(todo);
  } catch (error) {
    console.error(error);
  }
};

const toggleTodoDone = async (req, res) => {
  try {
    const todoRef = await Todos.findById(req.params.id);

    const todo = await Todos.findOneAndUpdate({ _id: req.params.id }, { completed: !todoRef.completed });

    await todo.save();

    return res.status(200).json(todo);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const updateTodo = async (req, res) => {
  console.log(req);
  const { idd, message, date, expDate } = req.body;
  try {
    const todo = await Todos.findByIdAndUpdate(idd, {
      message,
      date,
      dateExpiration: expDate,
    });

    await todo.save();

    return res.status(200).json(todo);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export { getTodos, addTodo, toggleTodoDone, updateTodo };
