import {Types} from "mongoose";

export interface IUser {
    username: string;
    password: string;
    displayName: string;
    phone: string;
    token: string;
}

export interface ICategory {
    title: string;
}

export interface IProduct {
    title: string;
    description: string;
    price: number;
    image: string | null;
    categoryId: string;
    user: string;
}