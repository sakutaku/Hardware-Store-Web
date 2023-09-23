import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hook';
import { selectCategories, selectCategoriesLoading } from '../store/categoriesSlice';
import { fetchCategories } from '../store/categoriesThunk';
import Spinner from './Spinner/Spinner';
import { Slide } from 'react-awesome-reveal';
import { fetchProducts } from '../store/productsThunk';

const Category = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const isLoading = useAppSelector(selectCategoriesLoading);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const categoryClick = async (id: string) => {
    dispatch(fetchProducts(id));
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
                  onClick={() => categoryClick('')}
                >
                  All
                </li>
              {categories.map(cat => (
                  <li
                    className="categories-item"
                    onClick={() => categoryClick(cat._id)}
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