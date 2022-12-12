import React, { useState, useLayoutEffect } from "react";
import Button from "react-bootstrap/Button";
import { addMongoTodos, filterTodos, checker } from "../../store/reducers/UserSlice";
import { deletedTodo, filterAllTodos } from "../../api/todoApi";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import s from "./TodoButtons.module.scss";
import { fechedAllTodo } from "../../utils/mongoHelper";

const TodoButtons = () => {
  const checkerValue = useAppSelector((state) => state.todos.checker);
  const [click, setClick] = useState<Array<boolean>>([false, false, false]);

  const dispatch = useAppDispatch();

  const deleteTodosDB = async () => {
    try {
      return await deletedTodo();
    } catch (error) {
      console.error(error);
    }
  };

  const filterTodosDB = async (param: string) => {
    try {
      const response = await filterAllTodos(param);
      return dispatch(addMongoTodos(fechedAllTodo(response.data)));
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = async (fieldName: string, strNum?: number) => {
    setClick(click.map((el, i, arr) => (i === strNum ? !el : false)));
    typeof strNum !== "number" &&
      (await deleteTodosDB()) &&
      dispatch(checker()) &&
      setClick(click.map((_, i) => i === 0));
    fieldName && typeof strNum === "number" && (await filterTodosDB(fieldName));
    dispatch(filterTodos(fieldName));
  };

  useLayoutEffect(() => {
    handleClick("all", 0);
  }, [checkerValue]);

  return (
    <div className={s.todoButtons}>
      <Button
        className={s.todoButtons_button}
        variant="outline-danger"
        active={click[0]}
        onClick={() => handleClick("all", 0)}
      >
        All
      </Button>
      <Button
        className={s.todoButtons_button}
        variant="outline-danger"
        active={click[1]}
        onClick={() => handleClick("active", 1)}
      >
        Active
      </Button>
      <Button
        className={s.todoButtons_button}
        variant="outline-danger"
        active={click[2]}
        onClick={() => handleClick("completed", 2)}
      >
        Completed
      </Button>
      <Button className={s.todoButtons_button} variant="outline-danger" onClick={() => handleClick("сlearCompleted")}>
        Clear completed
      </Button>
    </div>
  );
};

export default TodoButtons;
