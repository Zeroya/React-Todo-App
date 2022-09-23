import React, { FC, useState, useLayoutEffect, FormEvent, ChangeEvent } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { IChange, TodoData } from "../../models/ITodo";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { addModalTodo, updateTodo } from "../../store/reducers/UserSlice";
import s from "./ModalWindow.module.scss";

const ModalWindow: FC<IChange> = ({ type, message, dateStored, idd }) => {
  const [input, setInput] = useState<TodoData>({ message: "", date: "", expDate: "", idd: `${idd}` });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useAppDispatch();

  const todos = useAppSelector((state) => state.todos.todos);

  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (/^[A-Za-zА-Яа-яЁё0-9\s]+$/.test(input.message) && /[0-9]+/.test(input.date) && /[0-9]+/.test(input.expDate)) {
      if (!type) {
        dispatch(addModalTodo(input));
        setInput({ message: "", date: "", expDate: "", idd: "" });
        setShow(false);
      } else {
        dispatch(updateTodo(input));
        setShow(false);
      }
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>, fieldName: string): void => {
    setInput({ ...input, [fieldName]: e.target.value });
  };

  useLayoutEffect(() => {
    setInput({ ...input, message: `${message}`, date: `${dateStored?.date}`, expDate: `${dateStored?.expDate}` });
    console.log(new Date());
    console.log(new Date().toLocaleDateString());
    console.log(new Date().toLocaleTimeString());
    console.log(new Date().getTime());
    console.log(new Date().getHours());
    console.log(new Date().getMinutes());
  }, [type]);

  return (
    <>
      <Form>
        <span onClick={handleShow}>
          {type ? (
            <i className={`fa fa-pencil ${s.pencilSimbol}`} aria-hidden="true"></i>
          ) : (
            <i className={`fa fa-plus ${s.plusSimbol}`} aria-hidden="true"></i>
          )}
        </span>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Todo input</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Label>Add message</Form.Label>
            <Form.Control
              className={s.formControl}
              type="text"
              value={`${input.message === "undefined" ? "" : input.message}`}
              required
              onChange={(e: any) => handleChange(e, "message")}
              placeholder="message"
              pattern="^[A-Za-zА-Яа-яЁё0-9\s]+$"
              autoFocus
            />
            <div style={{ margin: "0.5em 0 0.5em" }}>
              <Form.Label>Creation date</Form.Label>
              <Form.Control
                className={s.formControl}
                type="datetime-local"
                value={input.date}
                required
                onChange={(e: any) => handleChange(e, "date")}
              />
            </div>
            <Form.Label>Expiration date</Form.Label>
            <Form.Control
              className={s.formControl}
              type="datetime-local"
              value={input.expDate}
              min={input.date}
              required
              onChange={(e: any) => handleChange(e, "expDate")}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Скасувати
            </Button>
            <Button variant="warning" type="submit" onClick={handleSubmit}>
              Зберегти
            </Button>
          </Modal.Footer>
        </Modal>
      </Form>
    </>
  );
};

export default ModalWindow;
