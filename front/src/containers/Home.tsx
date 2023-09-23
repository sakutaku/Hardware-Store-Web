import React, { useEffect } from 'react';
import AppToolbar from '../components/AppToolbar/AppToolbar';
import Category from '../components/Category';
import { useAppDispatch, useAppSelector } from '../app/hook';
import { selectProducts, selectProductsLoading } from '../store/productsSlice';
import { fetchProducts } from '../store/productsThunk';
import Spinner from '../components/Spinner/Spinner';
import ProductItem from '../components/ProductItem';
import {selectCategory} from "../store/categoriesSlice";

const Home = () => {
  const dispatch = useAppDispatch();
  const products= useAppSelector(selectProducts);
  const fetchLoading = useAppSelector(selectProductsLoading);
  const category = useAppSelector(selectCategory);

  useEffect(() => {
    dispatch(fetchProducts(''));
  }, [dispatch]);

  return (
    <>
      <AppToolbar/>
      <Category/>
      <div className="container">
          <h1 className="category-title">{category}</h1>
          <div className="products-page">
              {fetchLoading ?
                  (<Spinner/>) :
                  (
                      products.map(product => (
                          <ProductItem product={product} key={product._id}/>
                      ))
                  )

              }
          </div>
      </div>
    </>
  );
};

export default Home;