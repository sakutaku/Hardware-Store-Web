import React from 'react';
import { Link  } from 'react-router-dom';
import logo from "../../assets/images/amazon.svg";

const AnonymousMenu = () => {
  return (
    <div className="header-inner container">
      <Link to='/' className="logo">
        <img src={logo} alt="Amazon" className="logo-img"/>
      </Link>
      <div>
        <Link to={'/register'} className="header-register">Register</Link>
        <Link to={'/login'} className="header-login">Login</Link>
      </div>
    </div>
  );
};

export default AnonymousMenu;