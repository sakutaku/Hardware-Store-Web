import { IProduct } from '../types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchProducts } from './productsThunk';
import { RootState } from '../app/store';

interface ProductsState {
  products: IProduct[],
  fetchLoading: boolean
}

const initialState: ProductsState = {
  products: [],
  fetchLoading: false
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.fetchLoading = false;
      state.products = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.fetchLoading = false;
    });
  }
});

export const productsReducer = productsSlice.reducer;
export const selectProducts = (state: RootState) => state.products.products;
export const selectProductsLoading = (state: RootState) => state.products.fetchLoading;
