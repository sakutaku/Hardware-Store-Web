import React from 'react';
import {Link} from 'react-router-dom';
import logo from "../../assets/images/amazon.svg";
import {fetchProducts} from "../../store/productsThunk";
import {addTitle} from "../../store/categoriesSlice";
import {useAppDispatch} from "../../app/hook";

const AnonymousMenu = () => {
    const dispatch = useAppDispatch();

    const onLogoClick = () => {
        dispatch(fetchProducts(''));
        dispatch(addTitle('All'));
    };

  return (
    <div className="header-inner container">
      <div className="logo" onClick={onLogoClick}>
        <img src={logo} alt="Amazon" className="logo-img"/>
      </div>
      <div>
        <Link to={'/register'} className="header-register">Register</Link>
        <Link to={'/login'} className="header-login">Login</Link>
      </div>
    </div>
  );
};

export default AnonymousMenu;