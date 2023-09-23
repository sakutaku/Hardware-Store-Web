import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import BtnSpinner from './Spinner/BtnSpinner';
import { useAppDispatch, useAppSelector } from '../app/hook';
import { IRegister } from '../types';
import { register } from '../store/usersThunk';
import { selectRegisterError, selectRegisterLoading } from '../store/usersSlice';

const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const registerLoading = useSelector(selectRegisterLoading);
  const error = useAppSelector(selectRegisterError);
  const navigate = useNavigate();
  const [state, setState] = useState<IRegister>({
    username: '',
    password: '',
    displayName: '',
    phone: ''
  });

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const onSubmitEventHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(register(state)).unwrap();
      alert('Congrats! You\'ve been registered!');
      navigate('/');
    } catch (e) {
      alert('Something is wrong!')
    } finally {
      setState(() => ({
        username: '',
        password: '',
        displayName: '',
        phone: ''
      }));
    }
  };

  const getFieldError = (name: string) => {
    try {
      return error?.errors[name].message;
    } catch (e) {
      return undefined;
    }
  };
  return (
    <form className="form" onSubmit={onSubmitEventHandler}>
      <div>
        <div className="input-wrap">
          <label className="form-label" htmlFor="username"> Your name:</label>
          {
            Boolean(getFieldError('username')) &&
            <span className="error">{getFieldError('username')}</span>
          }
          <input
            className={Boolean(getFieldError('username')) ? 'form-control-error' : 'form-control'}
            name="username"
            type="text"
            onChange={changeEventHandler}
          />
        </div>

        <div className="input-wrap">
          <label className="form-label" htmlFor="password"> Password:</label>
          {
            Boolean(getFieldError('password')) &&
            <span className="error">{getFieldError('password')}</span>
          }
          <input
            className={Boolean(getFieldError('password')) ? 'form-control-error' : 'form-control'}
            name="password"
            type="password"
            onChange={changeEventHandler}
          />
        </div>

        <div className="input-wrap">
          <label className="form-label" htmlFor="displayName"> Display name:</label>
          {
            Boolean(getFieldError('displayName')) &&
            <span className="error">{getFieldError('displayName')}</span>
          }
          <input
            className={Boolean(getFieldError('displayName')) ? 'form-control-error' : 'form-control'}
            name="displayName"
            type="text"
            onChange={changeEventHandler}
          />
        </div>

        <div className="input-wrap">
          <label className="form-label" htmlFor="phone"> Phone:</label>
          {
            Boolean(getFieldError('phone')) &&
            <span className="error">{getFieldError('phone')}</span>
          }
          <input
            className={Boolean(getFieldError('phone')) ? 'form-control-error' : 'form-control'}
            name="phone"
            type="text"
            onChange={changeEventHandler}
          />
        </div>
        <div className="btn-wrap">
          <button
            type="submit"
            className="form-btn"
            disabled={registerLoading}
          >
            {registerLoading && <BtnSpinner/>}
            Register
          </button>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;