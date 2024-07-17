import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import logo from "../../assets/images/amazon.svg";
import {fetchProducts} from "../../store/productsThunk";
import {addTitle} from "../../store/categoriesSlice";
import {useAppDispatch} from "../../app/hook";
import AnonymousModal from './AnonymousModal';

const AnonymousMenu = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);


    const onLogoClick = () => {
        dispatch(fetchProducts(''));
        dispatch(addTitle('All'));
        navigate('/');
        setShowPopup(false);
        document.body.classList.remove('popup-open');
    };

    const onBurgerClick = () => {
      setShowPopup(true);
    };

  return (
    <div className="header-inner container">
      {
        showPopup && (
          <AnonymousModal setShowPopup={setShowPopup} showPopup={showPopup} onLogoClick={onLogoClick}/>
        )
      }
      <div className="logo" onClick={onLogoClick}>
        <img src={logo} alt="Amazon" className="logo-img"/>
      </div>
      <div className="header-inner-enter-desktop">
        <Link to={'/register'} className="header-register">Register</Link>
        <Link to={'/login'} className="header-login">Login</Link>
      </div>
      <div 
      onClick={onBurgerClick}
      className="header-inner-right-mini">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default AnonymousMenu;