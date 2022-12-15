export interface ITodo {
  _id: string;
  message: string;
  date: string;
  dateExpiration: string;
  completed: boolean;
  dateStored: {
    date: string;
    expDate: string;
  };
}

export interface TodoData {
  message: string;
  date: string;
  expDate: string;
  idd: string;
}

export interface UserDate {
  message: string;
  date: string;
  expDate: string;
}

export interface IChange {
  type?: string;
  message?: string;
  date?: string;
  expDate?: string;
  idd?: string;
}

export interface IUser {
  userName: string;
  password: string;
}

export interface ILogedUser {
  userId: string;
  userName: string;
}

export interface IMongoTodo {
  _id?: string;
  idd?: string;
  message: string;
  userId?: string;
  date: string;
  dateExpiration: string;
  completed?: boolean;
  dateStored?: {
    date: string;
    expDate: string;
  };
}

export interface sendTodo {
  _id: string;
  message: string;
  date: string;
  dateExpiration: string;
  completed: boolean;
}
