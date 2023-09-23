import { createAsyncThunk } from '@reduxjs/toolkit';
import {IProduct, IProductMutation} from '../types';
import axiosApi from '../axiosApi';
import {RootState} from "../app/store";

export const fetchProducts = createAsyncThunk<IProduct[], string>(
  'products/fetch',
  async (id) => {
    const productsResponse = await axiosApi.get<IProduct[]>(`/products?category=${id}`);
    return productsResponse.data;
  }
);

export const fetchOneProduct = createAsyncThunk<IProduct, string>(
  'products/fetchOne',
  async (id) => {

    const response = await axiosApi.get<IProduct>('/products/' + id);
    return response.data;
  }
);

export const createProducts = createAsyncThunk<void, IProductMutation, { state: RootState }>(
    'posts/create',
    async (data, thunkAPI) => {
        const formData = new FormData();
        const keys = Object.keys(data) as (keyof IProductMutation)[];

        keys.forEach(key => {
            const value = data[key];

            if (value !== null) {
                formData.append(key, value);
            }
        });

        const usersState = thunkAPI.getState().users;
        const token = usersState.user?.token;
        await axiosApi.post('/products', formData, {headers: {'Authorization': token}});
    }
);

export const deleteProduct = createAsyncThunk<void, string, { state: RootState }>(
  'products/delete',
  async (id, thunkAPI) => {
      const usersState = thunkAPI.getState().users;
      const token = usersState.user?.token;
      await axiosApi.delete('/products/' + id, {headers: {'Authorization': token}});
  }
);