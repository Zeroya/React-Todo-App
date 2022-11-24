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

    const respInfo = await Todos.findById(req.params.id);

    if (!todo) {
      res.status(404).json({ msg: `No todo with id: ${req.params.id}` });
    } else {
      res.status(200).json(respInfo);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateTodo = async (req, res) => {
  const { idd, message, date, expDate } = req.body;
  try {
    const todo = await Todos.findByIdAndUpdate(idd, {
      message,
      date,
      dateExpiration: expDate,
    });

    await todo.save();

    const respInfo = await Todos.findById(idd);

    res.status(200).json(respInfo);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteTodo = async (req, res) => {
  try {
    const deleteItem = await Todos.findByIdAndDelete(req.params.id);
    res.status(200).json(deleteItem);
  } catch (error) {
    res.status(500).json(error);
  }
};

export { getTodos, addTodo, toggleTodoDone, updateTodo, deleteTodo };
