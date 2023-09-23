import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hook';
import { selectCategories, selectCategoriesLoading } from '../store/categoriesSlice';
import { fetchCategories } from '../store/categoriesThunk';
import Spinner from './Spinner/Spinner';
import { Link } from 'react-router-dom';

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
            <Link to="/" className="categories-link">
              <li
                className="categories-item"
              >
                All
              </li>
            </Link>
            {categories.map(cat => (
              <Link to={`/products/${cat._id}`} className="categories-link">
                <li
                  className="categories-item"
                  key={cat._id}
                >
                  {cat.title}
                </li>
              </Link>

            ))}
          </ul>
      }
    </div>
  );
};

export default Category;