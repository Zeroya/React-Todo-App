import React, { FC } from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { sortTodosBy } from "../../store/reducers/UserSlice";
import Dropdown from "react-bootstrap/Dropdown";
import { SortOptions } from "../../models/Enums";
import DropdownButton from "react-bootstrap/DropdownButton";
import s from "./DropdownSortButton.module.scss";

const DropdownSortButton: FC = () => {
  const dispatch = useAppDispatch();

  const handleClick = (sortDate: string): void => {
    dispatch(sortTodosBy(sortDate));
  };

  return (
    <DropdownButton className={s.todoDropdown_button} variant="danger" title="Sort" id="dropdown-basic-button">
      <Dropdown.Item onClick={() => handleClick(SortOptions.message)}>By message↓</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item onClick={() => handleClick(SortOptions.date)}>By exp time↓</Dropdown.Item>
    </DropdownButton>
  );
};

export default DropdownSortButton;
