import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hook';
import { logout } from '../../store/usersThunk';
import { User } from '../../types';
import logo from "../../assets/images/amazon.svg";
import {fetchProducts} from "../../store/productsThunk";
import {addTitle} from "../../store/categoriesSlice";
import UserModal from './UserModal';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);

  const handleLogout = () => {
    if(window.confirm('Do you want to logout?')) {
      dispatch(logout());
      setShowPopup(false);
      document.body.classList.remove('popup-open');
      navigate('/');
    }
  };

  const onLogoClick = () => {
    dispatch(fetchProducts(''));
    dispatch(addTitle('All'));
    setShowPopup(false);
    document.body.classList.remove('popup-open');
    navigate('/');
  };

  const onBurgerClick = () => {
    setShowPopup(true);
  }

  return (
    <div className="header-inner container">
      {
        showPopup && (
          <UserModal 
          setShowPopup={setShowPopup} 
          showPopup={showPopup} 
          userName={user.displayName}
          handleLogout={handleLogout}
          onLogoClick={onLogoClick}
          />
        )
      }
      <div className="logo" onClick={onLogoClick}>
        <img src={logo} alt="Amazon" className="logo-img"/>
      </div>

      <div className="header-inner-right">
        <div className="header-username">
          <h2>Hello, {user.displayName}!
          </h2>
        </div>
        <div>
          <Link to={'/add-product'} className="header-post">Add product</Link>
        </div>
        <div className="header-logout" onClick={handleLogout}>Logout</div>
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

export default UserMenu;