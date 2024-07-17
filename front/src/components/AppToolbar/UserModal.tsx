import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../App.css';
import logo from "../../assets/images/amazon.svg";


interface Props {
    setShowPopup: Dispatch<SetStateAction<boolean>>;
    showPopup: boolean;
    userName: string;
    handleLogout: () => void;
    onLogoClick: () => void;
}

const UserModal: React.FC<Props> = ({showPopup, setShowPopup, userName, handleLogout, onLogoClick}) => {
    useEffect(() => {
        if (showPopup) {
            document.body.classList.add('popup-open');
        } else {
            document.body.classList.remove('popup-open');
        }
    }, [showPopup]);

    const handleClose = () => {
        document.body.classList.remove('popup-open');
        setShowPopup(false);
    };
    
    const handlePopupClose = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
    };

    return (
        <div className={`popup ${showPopup && 'open'}`}>
            <div 
            onClick={handlePopupClose}
            className="popupContent"
            >
                <div className="header-popup-top">
                    <div onClick={onLogoClick} className="logo">
                        <img src={logo} alt="Amazon" className="logo-img"/>
                    </div>
                    <div 
                    onClick={handleClose}
                    className="header-popup-close">
                        X
                    </div>
                </div>
                <div className="header-popup-bottom">
                    <h2>Hello, {userName}!</h2>
                    <div>
                        <Link to={'/add-product'} className="header-post-modal">Add product</Link>
                    </div>
                    <div 
                    className="header-logout header-logout-modal" 
                    onClick={handleLogout}>Logout</div>
                </div>
            </div>
        </div>
    )
};

export default UserModal;

