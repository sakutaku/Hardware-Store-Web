import React, { useEffect } from 'react';
import AppToolbar from '../components/AppToolbar/AppToolbar';
import RegisterForm from '../components/RegisterForm';
import { Fade } from 'react-awesome-reveal';

const Register = () => {
  useEffect(() => {
    document.body.classList.remove('popup-open');
  }, []);

  return (
    <>
      <AppToolbar/>
      <div className="container register-page">
        <h2 className="register-title">Register</h2>
        <Fade>
          <RegisterForm/>
        </Fade>

      </div>
    </>
  );
};

export default Register;