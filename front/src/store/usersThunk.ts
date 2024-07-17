import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import { unsetUser } from './usersSlice';
import axiosApi from '../axiosApi';
import { RootState } from '../app/store';
import { GlobalError, RegisterMutation, RegisterResponse, ValidationError } from '../types';



export const register = createAsyncThunk<
  RegisterResponse,
  RegisterMutation,
  {rejectValue: ValidationError}
>(
  'users/register',
  async (registerMutation: RegisterMutation, {rejectWithValue}) => {
    try {
      const response = await axiosApi.post<RegisterResponse>('/users', registerMutation);
      return response.data;
    } catch (e) {
      if( isAxiosError(e) && e.response && e.response.status === 400 ) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  }
);

export const loginUser = createAsyncThunk<
  RegisterResponse,
  RegisterMutation,
  {rejectValue: GlobalError}>(
  'users/login',
  async (loginMutation, {rejectWithValue}) => {
    try {
      const response = await axiosApi.post<RegisterResponse>('/users/sessions', loginMutation);
      console.log(response.data)
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as GlobalError);
      }

      throw e;
    }
  }
);

export const logout = createAsyncThunk<void, void, {state: RootState}>(
  'users/logout',
  async (_, {getState, dispatch}) => {
    const token = getState().users.user?.token;
    await axiosApi.delete('users/sessions', {headers: {'Authorization': token}});
    dispatch(unsetUser());
  }
)