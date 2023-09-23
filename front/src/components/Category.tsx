import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hook';
import { selectCategories, selectCategoriesLoading } from '../store/categoriesSlice';
import { fetchCategories } from '../store/categoriesThunk';
import Spinner from './Spinner/Spinner';

const Category = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const isLoading = useAppSelector(selectCategoriesLoading);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="categories">
      {
        isLoading ?
          (<Spinner/>)
          :
          <ul className="categories-list">
            {categories.map(cat => (
              <li
                className="categories-item"
                key={cat._id}
              >
                {cat.title}
              </li>
            ))}
          </ul>
      }
    </div>
  );
};

export default Category;