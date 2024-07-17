import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useAppDispatch, useAppSelector } from '../app/hook';
import {addTitle, selectCategories, selectCategoriesLoading} from '../store/categoriesSlice';
import { fetchCategories } from '../store/categoriesThunk';
import Spinner from './Spinner/Spinner';
import { Slide } from 'react-awesome-reveal';
import { fetchProducts } from '../store/productsThunk';
import 'swiper/css';
import BtnSpinner from './Spinner/BtnSpinner';

const Category = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const isLoading = useAppSelector(selectCategoriesLoading);

  useEffect(() => {
    try {
      dispatch(fetchCategories());
    } catch (e) {
      alert('Something is wrong!');
    }

  }, [dispatch]);

  const categoryClick = async (id: string, title: string) => {
    try {
      dispatch(fetchProducts(id));
    } catch (e) {
      alert('Something is wrong!');
    }
    dispatch(addTitle(title));
  };

  return (
    <div className="categories">
      {
        isLoading ?
          (<BtnSpinner/>)
          :
          <ul className="categories-list">
            <Slide>
                <li
                  className="categories-item"
                  onClick={() => categoryClick('', 'All')}
                >
                  All
                </li>
              {categories.map(cat => (
                  <li
                    key={cat._id}
                    className="categories-item"
                    onClick={() => categoryClick(cat._id, cat.title)}
                  >
                    {cat.title}
                  </li>

              ))}
            </Slide>

          </ul>
      }
      {
        <div className="categoris-list-mini">
          <Swiper
              slidesPerView={3}
              spaceBetween={10}
              className="mySwiper"
            >
              <SwiperSlide>
                <span
                  className="categories-item"
                  onClick={() => categoryClick('', 'All')}
                >
                  All
                </span>
              </SwiperSlide>
              {categories.map(cat => (
                <SwiperSlide 
                key={cat._id}>
                  <span
                    key={cat._id}
                    className="categories-item"
                    onClick={() => categoryClick(cat._id, cat.title)}
                  >
                    {cat.title}
                  </span>
                </SwiperSlide>
                  

              ))}
            </Swiper>
        </div>
       
      }
    </div>
  );
};

export default Category;