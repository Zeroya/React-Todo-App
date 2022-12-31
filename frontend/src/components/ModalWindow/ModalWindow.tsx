import React, {
  FC,
  useState,
  useLayoutEffect,
  FormEvent,
  ChangeEvent,
  KeyboardEvent,
  useRef,
  MutableRefObject,
} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { IChange, TodoData } from "../../models/ITodo";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { Сondition } from "../../models/Enums";
import { updateTodo, checker, addNewMongoTodo } from "../../store/reducers/UserSlice";
import { addTodoDB, updatedTodo } from "../../api/todoApi";
import { addSimpleFechedInputTodo, addModalInputTodo, reformUpdatedTodo } from "../../utils/mongoHelper";
import s from "./ModalWindow.module.scss";

const ModalWindow: FC<IChange> = ({ type, message, date, expDate, idd }) => {
  const filtValue = useAppSelector((state) => state.todos.filtValue);
  const [input, setInput] = useState<TodoData>({
    message: "",
    date: "",
    expDate: "",
    idd: `${idd}`,
  });
  const [errors, setErrors] = useState({} as TodoData | any);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useAppDispatch();

  const addMongoTodo = async (input: TodoData) => {
    try {
      const response = await addTodoDB(addModalInputTodo(input));
      dispatch(addNewMongoTodo(addSimpleFechedInputTodo(response.data)));
    } catch (error) {
      console.error(error);
    }
  };

  const updateTodoDB = async (input: TodoData) => {
    try {
      await updatedTodo(reformUpdatedTodo(input));
      dispatch(updateTodo(input));
    } catch (error) {
      console.error(error);
    }
  };

  const findFormErrors = () => {
    const { message, date, expDate } = input;
    const newErrors = {} as TodoData | any;

    if (!message || message === "") newErrors.message = "cannot be blank!";
    else if (message.length > 30) newErrors.message = "message is too long!";
    if (!date || date === "") newErrors.date = "please, add creation date";
    if (!expDate || expDate === "") newErrors.expDate = "please, add expiration date";
    else if (date && expDate && new Date(date).getTime() > new Date(expDate).getTime())
      newErrors.expDate = "expiration date must be later than creation date";

    return newErrors;
  };

  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const newErrors = findFormErrors();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      if (
        input.message &&
        input.date &&
        input.expDate &&
        /^[A-Za-zА-Яа-яЁё0-9\s]+$/.test(input.message) &&
        /[0-9]+/.test(input.date) &&
        /[0-9]+/.test(input.expDate)
      ) {
        if (!type) {
          addMongoTodo(input);
          if (!filtValue.localeCompare(Сondition.active) || !filtValue.localeCompare(Сondition.completed)) {
            dispatch(checker());
          }
          setInput({ message: "", date: "", expDate: "", idd: "" });
          setShow(false);
        } else {
          updateTodoDB(input);
          setShow(false);
        }
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, fieldName: string): void => {
    setInput({ ...input, [fieldName]: e.target.value });

    if (!!errors[fieldName])
      setErrors({
        ...errors,
        [fieldName]: null,
      });
  };

  useLayoutEffect(() => {
    message && date && expDate && setInput({ ...input, message, date, expDate });
  }, [type]);

  return (
    <>
      <form onKeyDown={(e: any) => (e.key === "Enter" ? handleSubmit(e) : "")}>
        <span onClick={handleShow}>
          <i
            className={`fa ${type ? `${s.pencilSymbol} fa-pencil` : `${s.plusSymbol} fa-plus`}`}
            aria-hidden="true"
          ></i>
        </span>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Todo input</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="validationCustom01">
              <Form.Label>Add message</Form.Label>
              <Form.Control
                required
                className={s.formControl}
                type="text"
                value={input.message}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, "message")}
                placeholder="message"
                pattern="^[A-Za-zА-Яа-яЁё0-9\s]+$"
                autoFocus
                isInvalid={!!errors.message}
              />
              <Form.Control.Feedback type="invalid">{errors.message}</Form.Control.Feedback>
            </Form.Group>
            <div style={{ margin: "0.5em 0 0.5em" }}>
              <Form.Group controlId="validationCustom02">
                <Form.Label>Creation date</Form.Label>
                <Form.Control
                  required
                  className={s.formControl}
                  type="datetime-local"
                  value={input.date}
                  max="9999-12-31T23:59"
                  pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, "date")}
                  isInvalid={!!errors.date}
                />

                <Form.Control.Feedback type="invalid">{errors.date}</Form.Control.Feedback>
              </Form.Group>
            </div>
            <Form.Group controlId="validationCustom02">
              <Form.Label>Expiration date</Form.Label>
              <Form.Control
                required
                className={s.formControl}
                type="datetime-local"
                value={input.expDate}
                min={input.date}
                max="9999-12-31T23:59"
                pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}"
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, "expDate")}
                isInvalid={!!errors.expDate}
              />
              <Form.Control.Feedback type="invalid">{errors.expDate}</Form.Control.Feedback>
            </Form.Group>
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
      </form>
    </>
  );
};

export default ModalWindow;
