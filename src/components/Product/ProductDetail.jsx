import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../../features/products/productsSlice';
import { useParams } from 'react-router-dom';
import '../../styles/product.css';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selected: product, status } = useSelector(state => state.products);

  const [sizes, setSizes] = useState([]);
  const [offers, setOffers] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    dispatch(fetchProductById(id));

    fetch(`http://localhost:8082/api/products/${id}/sizes`)
      .then(res => res.json())
      .then(setSizes);

    fetch(`http://localhost:8082/api/products/${id}/offers`)
      .then(res => res.json())
      .then(setOffers);
  }, [dispatch, id]);

  const handleAddToCart = () => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 1800);
  };

  if (!product) return <div className="product-detail-loading">Loading...</div>;

  return (
    <div className="product-detail-container">
      <div className="product-detail-image">
        <img src={product.image_url} alt={product.product_name} />
      </div>
      <div className="product-detail-info">
        <h1>{product.product_name}</h1>
        <div className="product-detail-pricing">
          <span className="product-detail-price">₹{product.price}</span>
          <span className="product-detail-original">₹{product.original_price}</span>
          {product.discount_percent > 0 && (
            <span className="product-detail-discount">{product.discount_percent}% OFF</span>
          )}
        </div>
        <p className="product-detail-desc">{product.description}</p>
        <div className="product-detail-meta">
          <div><strong>Brand:</strong> {product.brand}</div>
          <div><strong>Stock:</strong> {product.quantity_in_stock}</div>
        </div>
        <div className="product-detail-sizes">
          <strong>Available Sizes:</strong>
          <div className="size-btn-group">
            {sizes.length > 0 ? (
              sizes.map(size => (
                <span key={size} className="size-btn">{size}</span>
              ))
            ) : (
              <span className="size-btn">N/A</span>
            )}
          </div>
        </div>
        <div className="product-detail-offers">
          <strong>Offers:</strong>
          <ul>
            {offers.length > 0 ? (
              offers.map((offer, idx) => <li key={idx}>{offer}</li>)
            ) : (
              <li>No offers</li>
            )}
          </ul>
        </div>
        <button className="product-detail-cart-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
      {showAlert && (
        <div className="cart-alert">
          Product added to cart!
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
