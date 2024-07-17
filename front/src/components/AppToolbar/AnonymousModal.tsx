import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../App.css';
import logo from "../../assets/images/amazon.svg";


interface Props {
    setShowPopup: Dispatch<SetStateAction<boolean>>;
    showPopup: boolean;
    onLogoClick: () => void;
}


const AnonymousModal: React.FC<Props> = ({showPopup, setShowPopup, onLogoClick}) => {
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
                    <div 
                    >
                        <Link to="/login" className='header-login'>
                        Login
                        </Link>
                    </div>
                    <div 
                    >
                        <Link to="/register" className="header-register" >
                        Register
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default AnonymousModal;