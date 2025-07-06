import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../features/products/productsSlice';
import { Link } from 'react-router-dom';
import '../../styles/product.css';

const ProductList = () => {
  const dispatch = useDispatch();
  const { items, status } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (status === 'loading') return <div>Loading products...</div>;
  if (status === 'failed') return <div>Failed to load products.</div>;

  return (
    <div className="product-list">
      {items.map(product => (
        <div className="product-card animated-fade-in-up" key={product.product_id}>
          <img src={product.image_url} alt={product.product_name} />
          <h3>{product.product_name}</h3>
          <p>₹{product.price} <span className="old-price">₹{product.original_price}</span></p>
          <Link to={`/product/${product.product_id}`} className="view-details-btn">View Details</Link>

        </div>
      ))}
    </div>
  );
};

export default ProductList;
