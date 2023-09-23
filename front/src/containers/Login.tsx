import React from 'react';
import AppToolbar from '../components/AppToolbar/AppToolbar';
import LoginForm from '../components/LoginForm';
import { Fade } from 'react-awesome-reveal';

const Login = () => {
  return (
    <>
      <AppToolbar/>
      <div className="container login-page">
        <h2 className="login-title">Login</h2>
        <Fade>
          <LoginForm/>
        </Fade>
      </div>
    </>
  );
};

export default Login;