import React from 'react';
import { IProduct } from '../types';
import { apiURL } from '../constants';
import { Fade } from 'react-awesome-reveal';

interface Props {
  product: IProduct
}
const ProductItem: React.FC<Props> = ({product}) => {
  const img = apiURL + '/' + product.image;

  return (
    <Fade>
      <div className="product-item">
        <div className="product-item-inner">
          <div>
            <img src={img} alt={product.title} className="product-img"/>
          </div>
          <div>
            <h2 className="product-title">{product.title}</h2>
          </div>
          <div>
            <h4 className="product-price">{product.price} $</h4>
          </div>
        </div>
      </div>
    </Fade>
  );
};

export default ProductItem;