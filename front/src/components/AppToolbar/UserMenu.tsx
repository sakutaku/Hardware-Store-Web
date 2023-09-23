import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hook';
import { logout } from '../../store/usersThunk';
import { User } from '../../types';
import logo from "../../assets/images/amazon.svg";
import {fetchProducts} from "../../store/productsThunk";
import {addTitle} from "../../store/categoriesSlice";

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    if(window.confirm('Do you want to logout?')) {
      dispatch(logout());
      navigate('/');
    }
  };

  const onLogoClick = () => {
    dispatch(fetchProducts(''));
    dispatch(addTitle('All'));
    navigate('/');
  };

  return (
    <div className="header-inner container">
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

    </div>
  );
};

export default UserMenu;