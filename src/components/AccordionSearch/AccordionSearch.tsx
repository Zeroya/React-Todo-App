import React, { FC, useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import { addSearchValue } from "../../store/reducers/UserSlice";
import { useAppDispatch } from "../../hooks/hooks";
import s from "./AccordionSearch.module.scss";

const AccordionSearch: FC = () => {
  const [search, setSearch] = useState("");
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    dispatch(addSearchValue(search));
  }, [search]);

  return (
    <div className={s.Accordion}>
      <Accordion className={s.Accordion_search}>
        <Accordion.Item className={s.Accordion_item} eventKey="0">
          <Accordion.Header>Search...</Accordion.Header>
          <Accordion.Body className={s.Accordion_body}>
            <input
              value={search}
              onChange={handleChange}
              className={s.Accordion_input}
              placeholder="search"
              type="text"
              pattern="^[A-Za-zА-Яа-яЁё0-9\s]+$"
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default AccordionSearch;
