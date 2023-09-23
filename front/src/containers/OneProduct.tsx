import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Zoom } from 'react-awesome-reveal';
import AppToolbar from '../components/AppToolbar/AppToolbar';
import { useAppDispatch, useAppSelector } from '../app/hook';
import { selectProduct } from '../store/productsSlice';
import { fetchOneProduct } from '../store/productsThunk';
import { apiURL } from '../constants';
import Spinner from '../components/Spinner/Spinner';
import Category from '../components/Category';
import { selectUser } from '../store/usersSlice';


const OneProduct = () => {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const product = useAppSelector(selectProduct);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if(id) {
      dispatch(fetchOneProduct(id));
    }
  }, [dispatch, id]);

  const postImage = apiURL + '/' + product?.image;

  return (
    <>
      <AppToolbar/>
      <Category/>
      <div className="container one-product-page">
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
                  <div>
                    {product.phone}
                  </div>
                </div>
              </div>
              {
                user ?
                  <div className="one-product-delete">
                    <button type="button" className="delete-btn">Delete Product</button>
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