import Todos from "../models/todoModal.js";

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
    res.status(201).json(todo);
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
  try {
    const { idd, message, date, expDate } = req.body;
    const todo = await Todos.findByIdAndUpdate(idd, {
      message,
      date,
      dateExpiration: expDate,
    });

    await todo.save();

    const respInfo = await Todos.findById(idd);

    if (!todo) {
      res.status(404).json({ msg: `No todo with id: ${req.params.id}` });
    } else {
      res.status(200).json(respInfo);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteTodo = async (req, res) => {
  try {
    if (!req.params.id) {
      const todos = await Todos.find({ completed: true }).deleteMany();
      return res.status(200).json(todos);
    }

    const deleteItem = await Todos.findByIdAndDelete(req.params.id);
    return res.status(200).json(deleteItem);
  } catch (error) {
    res.status(500).json(error);
  }
};

const buttonFilterTodos = async (req, res) => {
  let param = req.params.param;
  if (param) {
    try {
      if (param === "active") {
        const activeTodos = await Todos.find({ completed: false });
        return res.status(200).json(activeTodos);
      }
      if (param === "completed") {
        const completedTodos = await Todos.find({ completed: true });
        return res.status(200).json(completedTodos);
      }
      const allTodos = await Todos.find({});
      return res.status(200).json(allTodos);
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

export { addTodo, toggleTodoDone, updateTodo, deleteTodo, buttonFilterTodos };
