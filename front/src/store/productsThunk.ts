import { createAsyncThunk } from '@reduxjs/toolkit';
import {  IProduct } from '../types';
import axiosApi from '../axiosApi';

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

export const deleteProduct = createAsyncThunk<void, string>(
  'products/delete',
  async (id) => {
    await axiosApi.delete('/products/' + id);
  }
);