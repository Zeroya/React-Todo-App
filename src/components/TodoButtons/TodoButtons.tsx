import React, { useState, useLayoutEffect } from "react";
import Button from "react-bootstrap/Button";
import { filterTodos } from "../../store/reducers/UserSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import s from "./TodoButtons.module.scss";

const TodoButtons = () => {
  const checkerValue = useAppSelector((state) => state.todos.checker);
  const [click, setClick] = useState<Array<boolean>>([false, false, false]);

  const dispatch = useAppDispatch();

  const handleClick = (fieldName: string, strNum?: number): void => {
    setClick(click.map((el, i, arr) => (i === strNum ? !el : false)));
    typeof strNum !== "number" && setClick(click.map((el, i) => (i === 0 ? true : false)));
    dispatch(filterTodos(fieldName));
  };

  useLayoutEffect(() => {
    handleClick("all", 0);
  }, [checkerValue]);

  return (
    <div className={s.buttons}>
      <Button variant="outline-danger" active={click[0]} onClick={() => handleClick("all", 0)}>
        All
      </Button>
      <Button variant="outline-danger" active={click[1]} onClick={() => handleClick("active", 1)}>
        Active
      </Button>
      <Button variant="outline-danger" active={click[2]} onClick={() => handleClick("completed", 2)}>
        Completed
      </Button>
      <Button variant="outline-danger" onClick={() => handleClick("сlearCompleted")}>
        Clear completed
      </Button>
    </div>
  );
};

export default TodoButtons;
