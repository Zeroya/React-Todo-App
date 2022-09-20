import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useAppDispatch } from '../../hooks/hooks';
import { addTodo } from '../../store/reducers/TodosSlice';
import s from "./ModalWindow.module.scss";

const ModalWindow: React.FC = () => {

  const [input, setInput] = useState('');
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(addTodo(input));
    setInput('');
    setShow(false);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value);
  }

  return (
    <>
      <Form >
        <span onClick={handleShow}><i className={`fa fa-plus ${s.plusSimbol}` } aria-hidden="true" ></i></span>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Todo input</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <input type="text" value={input} onChange={handleChange} placeholder="message"  pattern="^[A-Za-zА-Яа-яЁё0-9\s]+$"  />
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
}


export default ModalWindow;