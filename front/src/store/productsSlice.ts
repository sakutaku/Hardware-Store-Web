import { IProduct } from '../types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchOneProduct, fetchProducts } from './productsThunk';
import { RootState } from '../app/store';

interface ProductsState {
  products: IProduct[],
  fetchLoading: boolean,
  product: IProduct | null,
  fetchOneLoading: boolean,
}

const initialState: ProductsState = {
  products: [],
  fetchLoading: false,
  product: null,
  fetchOneLoading: false
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
    builder.addCase(fetchOneProduct.pending, (state) => {
      state.fetchOneLoading = true;
    });
    builder.addCase(fetchOneProduct.fulfilled, (state, {payload: product}) => {
      state.product = product;
      state.fetchOneLoading = false;
    });
    builder.addCase(fetchOneProduct.rejected, (state) => {
      state.fetchOneLoading = false;
    });
  }
});

export const productsReducer = productsSlice.reducer;
export const selectProducts = (state: RootState) => state.products.products;
export const selectProductsLoading = (state: RootState) => state.products.fetchLoading;
export const selectProduct = (state: RootState) => state.products.product;
