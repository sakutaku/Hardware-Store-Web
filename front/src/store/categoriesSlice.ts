import { ICategory } from '../types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchCategories } from './categoriesThunk';
import { RootState } from '../app/store';

interface CategoriesState {
  categories: ICategory[],
  fetchLoading: boolean
}

const initialState: CategoriesState = {
  categories: [],
  fetchLoading: false
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.fetchLoading = false;
      state.categories = action.payload;
    });
    builder.addCase(fetchCategories.rejected, (state) => {
      state.fetchLoading = false;
    });
  }
});

export const categoriesReducer = categoriesSlice.reducer;
export const selectCategories = (state: RootState) => state.categories.categories;
export const selectCategoriesLoading = (state: RootState) => state.categories.fetchLoading;

