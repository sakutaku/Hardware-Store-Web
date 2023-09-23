import React, { useEffect } from 'react';
import AppToolbar from '../components/AppToolbar/AppToolbar';
import Category from '../components/Category';
import { useAppDispatch, useAppSelector } from '../app/hook';
import { selectProducts, selectProductsLoading } from '../store/productsSlice';
import { fetchProducts } from '../store/productsThunk';
import Spinner from '../components/Spinner/Spinner';
import ProductItem from '../components/ProductItem';

const Home = () => {
  const dispatch = useAppDispatch();
  const products= useAppSelector(selectProducts);
  const fetchLoading = useAppSelector(selectProductsLoading);

  useEffect(() => {
    dispatch(fetchProducts(''))
  }, [dispatch]);

  return (
    <>
      <AppToolbar/>
      <Category/>
      <div className="container products-page">
        {fetchLoading ?
          (<Spinner/>) :
          (
            products.map(product => (
              <ProductItem product={product} key={product._id}/>
            ))
          )
        }
      </div>
    </>
  );
};

export default Home;