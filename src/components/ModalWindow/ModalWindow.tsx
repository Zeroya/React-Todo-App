import React, { FC, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useAppDispatch } from "../../hooks/hooks";
import { addModalTodo } from "../../store/reducers/UserSlice";
import s from "./ModalWindow.module.scss";

const ModalWindow: FC = () => {
  type TodoData = {
    message: string;
    date: string;
    expDate: string;
  };

  const [input, setInput] = useState<TodoData>({ message: "", date: "", expDate: "" });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (/^[A-Za-zА-Яа-яЁё0-9\s]+$/.test(input.message) && /[0-9]+/.test(input.date) && /[0-9]+/.test(input.expDate)) {
      dispatch(addModalTodo(input));
      setInput({ message: "", date: "", expDate: "" });
      setShow(false);
    }
  };

  const handleChangeMessage = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput({ ...input, message: e.target.value });
  };

  const handleChangeData = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput({ ...input, date: e.target.value });
  };

  const handleChangeExpData = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput({ ...input, expDate: e.target.value });
  };

  return (
    <>
      <Form>
        <span onClick={handleShow}>
          <i className={`fa fa-plus ${s.plusSimbol}`} aria-hidden="true"></i>
        </span>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Todo input</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Label>Add message</Form.Label>
            <Form.Control
              type="text"
              value={input.message}
              required
              onChange={handleChangeMessage}
              placeholder="message"
              pattern="^[A-Za-zА-Яа-яЁё0-9\s]+$"
              autoFocus
            />
            <div style={{ margin: "0.5em 0 0.5em" }}>
              <Form.Label>Creation date</Form.Label>
              <Form.Control type="datetime-local" required placeholder="start data" onChange={handleChangeData} />
            </div>
            <Form.Label>Expiration date</Form.Label>
            <Form.Control type="datetime-local" placeholder="expiration data" required onChange={handleChangeExpData} />
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
