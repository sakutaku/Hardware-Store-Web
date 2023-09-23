import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICategory } from '../types';
import axiosApi from '../axiosApi';

export const fetchCategories = createAsyncThunk<ICategory[]>(
  'categories/fetch',
  async () => {
    const categoriesResponse = await axiosApi.get<ICategory[]>('/categories');
    return categoriesResponse.data;
  }
);