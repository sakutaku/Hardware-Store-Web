import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hook';
import {addTitle, selectCategories, selectCategoriesLoading} from '../store/categoriesSlice';
import { fetchCategories } from '../store/categoriesThunk';
import Spinner from './Spinner/Spinner';
import { Slide } from 'react-awesome-reveal';
import { fetchProducts } from '../store/productsThunk';

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
          (<Spinner/>)
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
    </div>
  );
};

export default Category;