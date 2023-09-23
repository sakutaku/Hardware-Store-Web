export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    }
  },
  message: string;
  name: string;
  _message: string;
}

export interface RegisterResponse {
  user: User;
  message: string;
}

export interface RegisterMutation {
  username: string;
  password: string;
}

export interface GlobalError {
  error: string;
}

export interface User {
  _id: string;
  username: string;
  token: string;
  displayName: string;
  phone: string;
}

export interface IUser {
  _id: string;
  username: string;
  token: string;
}

export interface IRegister {
  username: string,
  password: string,
  displayName: string,
  phone: string,
}
export interface ILogin{
  username: string,
  password: string,
}
export interface ICategory{
  _id: string,
  title: string
}

export interface IProduct {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  user: string;
  phone: string
}