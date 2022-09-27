export interface ITodo {
  id: string;
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

export interface whyQQQ {
  type?: string;
  message?: string;
  date?: string;
  expDate?: string;
  idd?: string;
}
