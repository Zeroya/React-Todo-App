import { IMongoTodo, TodoData } from "../models/ITodo";
import {
  getCreationInputDate,
  getCreationInputDateExpiration,
  getCreationModalDate,
  getCreationStoredDateExpiration,
  getCreationStoredInputDate,
} from "./CreateDate";

export const addSimpleInputTodo = (message: string): IMongoTodo => {
  return {
    message,
    date: getCreationInputDate(),
    dateExpiration: getCreationInputDateExpiration(),
    dateStored: {
      date: getCreationStoredInputDate(),
      expDate: getCreationStoredDateExpiration(),
    },
  };
};

export const addModalInputTodo = (input: TodoData): IMongoTodo => {
  const { message, date, expDate } = input;
  return {
    message,
    date: getCreationModalDate(date),
    dateExpiration: getCreationModalDate(expDate),
    dateStored: { date, expDate },
  };
};
