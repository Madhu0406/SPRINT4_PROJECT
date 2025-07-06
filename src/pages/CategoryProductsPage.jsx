import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../features/products/productsSlice';
import { fetchCategories } from '../features/categories/categoriesSlice';
import '../styles/categoryproduct.css';

const pageVariants = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  exit: { opacity: 0, y: -40, transition: { duration: 0.3, ease: "easeIn" } }
};

const CategoryProductsPage = () => {
  const { categoryId } = useParams();
  const dispatch = useDispatch();

  const products = useSelector(state => state.products.items);
  const categories = useSelector(state => state.categories.items);
  const productsStatus = useSelector(state => state.products.status);
  const categoriesStatus = useSelector(state => state.categories.status);

  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState(Number(categoryId) || '');
  const [availability, setAvailability] = useState('all');

  useEffect(() => {
    if (productsStatus === 'idle') dispatch(fetchProducts());
    if (categoriesStatus === 'idle') dispatch(fetchCategories());
  }, [dispatch, productsStatus, categoriesStatus]);

  useEffect(() => {
    setFilterCategory(Number(categoryId) || '');
  }, [categoryId]);

  const filteredProducts = products
    .filter(
      p =>
        (!filterCategory || p.category_id === filterCategory) &&
        (availability === 'all' ||
          (availability === 'available' && p.quantity_in_stock > 0) ||
          (availability === 'unavailable' && p.quantity_in_stock === 0)) &&
        (p.product_name.toLowerCase().includes(search.toLowerCase()) ||
          p.product_id.toLowerCase().includes(search.toLowerCase()))
    );

  return (
    <motion.div
      className="catprod-wrapper"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ minHeight: "80vh" }}
    >
      <aside className="catprod-sidebar">
        <h3>Filters</h3>
        <div className="catprod-filter">
          <label htmlFor="category-select">Category:</label>
          <select
            id="category-select"
            value={filterCategory}
            onChange={e => setFilterCategory(Number(e.target.value) || '')}
          >
            <option value="">All</option>
            {categories.map(cat => (
              <option key={cat.category_id} value={cat.category_id}>
                {cat.category_name}
              </option>
            ))}
          </select>
        </div>
        <div className="catprod-filter">
          <label htmlFor="availability-select">Availability:</label>
          <select
            id="availability-select"
            value={availability}
            onChange={e => setAvailability(e.target.value)}
          >
            <option value="all">All</option>
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>
        </div>
      </aside>
      <main className="catprod-main">
        <div className="catprod-header">
          <input
            type="text"
            className="catprod-search"
            placeholder="Search by product name or ID"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <span className="catprod-count">
            {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''}
          </span>
        </div>
        <div className="catprod-list">
          {productsStatus === 'loading' || categoriesStatus === 'loading' ? (
            <div className="catprod-empty">Loading...</div>
          ) : filteredProducts.length === 0 ? (
            <div className="catprod-empty">No products found.</div>
          ) : (
            filteredProducts.map(product => (
              <Link
                to={`/product/${product.product_id}`}
                className="catprod-card-link"
                key={product.product_id}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div className="catprod-card">
                  <img src={product.image_url} alt={product.product_name} />
                  <h3>{product.product_name}</h3>
                  <div className="catprod-price">
                    ₹{product.price}{' '}
                    <span className="catprod-oldprice">₹{product.original_price}</span>
                  </div>
                  <div className="catprod-stock">
                    {product.quantity_in_stock > 0 ? (
                      <span className="catprod-instock">In Stock</span>
                    ) : (
                      <span className="catprod-outstock">Out of Stock</span>
                    )}
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </main>
    </motion.div>
  );
};

export default CategoryProductsPage;
