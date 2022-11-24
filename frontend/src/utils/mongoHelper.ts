import { IMongoTodo, ITodo, sendTodo, TodoData } from "../models/ITodo";
import {
  getCreatedForm,
  getCreationInputDate,
  getCreationInputDateExpiration,
  getCreationModalDate,
} from "./CreateDate";

export const addSimpleInputTodo = (message: string): IMongoTodo => {
  return {
    message,
    date: getCreationInputDate(),
    dateExpiration: getCreationInputDateExpiration(),
  };
};

export const addModalInputTodo = (input: TodoData): IMongoTodo => {
  const { message, date, expDate } = input;
  return {
    message,
    date: getCreationModalDate(date),
    dateExpiration: getCreationModalDate(expDate),
  };
};

export const addSimpleFechedInputTodo = (input: sendTodo): ITodo => {
  const { date, dateExpiration } = input;
  return {
    ...input,
    dateStored: {
      date: getCreatedForm(date),
      expDate: getCreatedForm(dateExpiration),
    },
  };
};

export const fechedAllTodo = (input: sendTodo[]): ITodo[] => {
  return input.map((el) => ({
    ...el,
    dateStored: {
      date: getCreatedForm(el.date),
      expDate: getCreatedForm(el.dateExpiration),
    },
  }));
};

export const reformUpdatedTodo = (input: TodoData): TodoData => {
  const { idd, message, date, expDate } = input;
  return {
    idd,
    message,
    date: getCreationModalDate(date),
    expDate: getCreationModalDate(expDate),
  };
};
