import React, { FC, useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { sortTodosBy } from "../../store/reducers/UserSlice";
import Dropdown from "react-bootstrap/Dropdown";
import { SortOptions } from "../../models/Enums";
import DropdownButton from "react-bootstrap/DropdownButton";
import s from "./DropdownSortButton.module.scss";

const DropdownSortButton: FC = () => {
  const [save, setSave] = useState("");
  const [switcher, setSwitcher] = useState(false);
  const todos = useAppSelector((state) => state.todos.todos);
  const dispatch = useAppDispatch();

  const handleClick = (sortDate: string): void => {
    sortDate === SortOptions.date ? setSwitcher(!switcher) : setSwitcher(false);
    dispatch(sortTodosBy(sortDate));
    setSave(sortDate);
  };

  useEffect(() => {
    handleClick(save);
    return () => handleClick(SortOptions.message);
  }, [todos.length]);

  return (
    <DropdownButton className={s.todoDropdown_button} variant="danger" title="Sort" id="dropdown-basic-button">
      <Dropdown.Item active={!switcher} onClick={() => handleClick(SortOptions.message)}>
        By message↓
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item active={switcher} onClick={() => handleClick(SortOptions.date)}>
        By exp time↓
      </Dropdown.Item>
    </DropdownButton>
  );
};

export default DropdownSortButton;
