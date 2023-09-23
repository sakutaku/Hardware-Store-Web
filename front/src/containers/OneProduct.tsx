import React, { useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { Zoom } from 'react-awesome-reveal';
import AppToolbar from '../components/AppToolbar/AppToolbar';
import { useAppDispatch, useAppSelector } from '../app/hook';
import {selectDeleteLoading, selectProduct} from '../store/productsSlice';
import {deleteProduct, fetchOneProduct} from '../store/productsThunk';
import { apiURL } from '../constants';
import Spinner from '../components/Spinner/Spinner';
import { selectUser } from '../store/usersSlice';
import BtnSpinner from "../components/Spinner/BtnSpinner";


const OneProduct = () => {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const product = useAppSelector(selectProduct);
  const user = useAppSelector(selectUser);
  const deleteLoading = useAppSelector(selectDeleteLoading);
  const navigate = useNavigate();

  useEffect(() => {
    if(id) {
      try {
          dispatch(fetchOneProduct(id));
      } catch (e) {
        alert('Something is wrong!');
      }

    }
  }, [dispatch, id]);

  const postImage = apiURL + '/' + product?.image;

  const onDelete =  async (id: string) => {
      if(user?._id === product?.userId) {
          if(window.confirm('Do you want to delete product?')) {
              await dispatch(deleteProduct(id));
              navigate('/');
          }
      } else {
          alert('You can remove only yours products!');
      }
  };

  return (
    <>
      <AppToolbar/>
      <div className="container">
        {
          product ?
            <Zoom>
              <div className="one-product">
                <div>
                  <h3 className="one-product-title">{product.title}</h3>
                  <img src={postImage} alt={product.title} className="one-product-img"/>

                </div>
                <div className="one-product-info">
                  <h5 className="one-product-price">{product.price} $</h5>
                </div>
              </div>
              <hr className="hr"/>
              <h2 className="one-product-title-info">Product Information</h2>
              <div className="one-product-full">
                <h3>Overview</h3>
                <div className="one-product-text">
                  <div className="one-product-cat">
                    <i>Category: {product.category}</i>
                  </div>
                  <p className="one-product-txt">{product.description}</p>
                </div>
              </div>
              <hr className="hr"/>
              <div className="one-product-user-info">
                <h3>Seller</h3>
                <div className="one-product-text">
                  {product.user}
                  <div className="one-product-phone">
                    {product.phone}
                  </div>
                </div>
              </div>
              {
                user ?
                  <div className="one-product-delete">
                    <button
                        type="button"
                        className="delete-btn"
                        disabled={deleteLoading}
                        onClick={() => onDelete(product?._id)}
                    >
                        {deleteLoading && <BtnSpinner/>}
                        Delete Product
                    </button>
                  </div>
                  :
                  null
              }
            </Zoom>
            :
            <Spinner/>
        }
      </div>

    </>
  );
};

export default OneProduct;