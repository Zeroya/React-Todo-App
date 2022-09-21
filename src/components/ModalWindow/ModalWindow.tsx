import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useAppDispatch } from '../../hooks/hooks';
import { addModalTodo } from '../../store/reducers/TodosSlice';
import s from "./ModalWindow.module.scss";

const ModalWindow: React.FC = () => {

  const [input, setInput] = useState<any>({});
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (/^[A-Za-zА-Яа-яЁё0-9\s]+$/.test(input.message) && /[0-9]+/.test(input.data) && /[0-9]+/.test(input.expData)) {
      dispatch(addModalTodo(input));
      setInput({});
      setShow(false);
    }
  }

  const handleChangeMessage = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput({ ...input, message: e.target.value });
  }

  const handleChangeData = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput({ ...input, data: e.target.value });
  }

  const handleChangeExpData = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput({ ...input, expData: e.target.value });
  }

  return (
    <>
      <Form >
        <span onClick={handleShow}><i className={`fa fa-plus ${s.plusSimbol}`} aria-hidden="true" ></i></span>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Todo input</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input type="text" value={input.message} required onChange={handleChangeMessage} placeholder="message" pattern="^[A-Za-zА-Яа-яЁё0-9\s]+$" />
            <div style={{ margin: '0.5em 0 0.5em' }}><input type="datetime-local" required placeholder="start data" onChange={handleChangeData} /></div>
            <input type="datetime-local" placeholder="expiration data" required onChange={handleChangeExpData} />
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
